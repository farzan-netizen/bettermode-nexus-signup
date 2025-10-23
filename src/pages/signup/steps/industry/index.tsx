import { Select } from '@/components/base/select/select'
import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'
import { findMatchingIndustry } from './utils'
import { useMemo, useState } from 'react'
import { ArrowRight } from '@untitledui/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupAppendForm,
  signupGoToNextStep,
  signupSelectFirstName,
  signupSelectIndustry,
} from '@/store/signup'
import { selectBrandState } from '@/store/brand'
import {
  INDUSTRIES_ITEMS,
  INDUSTRIES_MAPPING,
  IndustryId,
  OTHER_INDUSTRIES_ITEMS,
  OTHER_INDUSTRIES_MAPPING,
} from './constants'
import { StepContainer } from '@/pages/step-container'

export const SignupIndustryStep = () => {
  const selectedIndustry = useAppSelector(signupSelectIndustry) as
    | IndustryId
    | undefined

  const isOtherSelected =
    !!selectedIndustry &&
    (!!OTHER_INDUSTRIES_MAPPING[selectedIndustry] ||
      selectedIndustry === IndustryId.OTHER)

  const [showIndustrySearch, setShowIndustrySearch] = useState(isOtherSelected)

  const brandData = useAppSelector(selectBrandState)
  const firstName = useAppSelector(signupSelectFirstName)

  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(signupGoToNextStep())
  }

  const preselectedIndustry = useMemo(() => {
    if (
      brandData?.company?.industries &&
      brandData.company.industries.length > 0 &&
      !selectedIndustry
    ) {
      const brandIndustry = brandData.company.industries[0]
      return findMatchingIndustry(brandIndustry.name)?.id || null
    }
    return null
  }, [brandData, selectedIndustry])

  const isPreselected = !selectedIndustry && !!preselectedIndustry

  const onSelectItem = (id: IndustryId) => {
    dispatch(signupAppendForm({ industry: id }))
    if (id === IndustryId.OTHER) {
      setShowIndustrySearch(true)
    } else {
      onNext()
    }
  }

  const onContinueWithPreSelect = () => {
    if (!preselectedIndustry) return
    dispatch(signupAppendForm({ industry: preselectedIndustry }))
    onNext()
  }

  return (
    <StepContainer
      title="What industry are you in?"
      topSlot={
        <div className="">
          <p className="text-lg text-tertiary">
            Nice to meet you <span className="font-bold">{firstName}</span>!
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {preselectedIndustry && (
          <div className="text-left">
            <p className="text-sm text-tertiary">
              Based on your company data, we think your industry is "
              {INDUSTRIES_MAPPING[preselectedIndustry]?.name}". Feel free to
              select something else if this doesn't look right.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {INDUSTRIES_ITEMS.map(industry => (
            <button
              key={industry.id}
              onClick={() => onSelectItem(industry.id)}
              className={cx(
                'p-3 sm:p-4 h-14 sm:h-16 rounded-lg border text-center transition-all hover:shadow-sm flex items-center justify-center relative',
                selectedIndustry === industry.id ||
                  (industry.id === IndustryId.OTHER && showIndustrySearch)
                  ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                  : 'border-secondary hover:border-primary',
              )}
            >
              <span className="text-xs sm:text-sm font-medium text-primary">
                {industry.name}
              </span>
              {industry.id === preselectedIndustry && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-secondary rounded-full border-2 border-primary"></div>
              )}
            </button>
          ))}
        </div>

        {showIndustrySearch ? (
          <div className="flex flex-col gap-4">
            <Select.ComboBox
              label="Search industries"
              placeholder="Type to search..."
              items={OTHER_INDUSTRIES_ITEMS}
              selectedKey={selectedIndustry}
              onSelectionChange={value => {
                if (value) onSelectItem(value as IndustryId)
              }}
            >
              {item => (
                <Select.Item id={item.id} supportingText={item.supportingText}>
                  {item.label}
                </Select.Item>
              )}
            </Select.ComboBox>

            <div className="flex justify-end">
              <button
                onClick={onNext}
                className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
              >
                Skip, and Continue →
              </button>
            </div>
          </div>
        ) : null}

        {isPreselected && (
          <div className="flex justify-end pt-4">
            <Button
              iconTrailing={ArrowRight}
              onClick={onContinueWithPreSelect}
              size="sm"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </StepContainer>
  )
}
