import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'
import { StepContainer } from '@/pages/step-container'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupAppendForm,
  signupSelectEnterpriseFeatures,
} from '@/store/signup'
import { useMemo, useState } from 'react'
import {
  ENTERPRISE_FEATURES_ITEMS,
  type EnterpriseFeatureId,
} from './constants'
import { useNavigate } from '@/hooks/use-navigate'
import { RoutePaths } from '@/constants/routes'
import { SignupEnterpriseStepSuccess } from './success'

export const SignupEnterpriseStep = () => {
  const [showEnterpriseSuccess, setShowEnterpriseSuccess] = useState(false)
  const storeEnterpriseFeatures = useAppSelector(signupSelectEnterpriseFeatures)
  const [selectedEnterpriseFeatures, setSelectedEnterpriseFeatures] = useState(
    storeEnterpriseFeatures || [],
  )
  const hasSelectedAll = useMemo(
    () =>
      ENTERPRISE_FEATURES_ITEMS.every(({ id }) =>
        selectedEnterpriseFeatures.includes(id),
      ),
    [selectedEnterpriseFeatures],
  )

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const redirectToWizard = () => {
    setShowEnterpriseSuccess(true)
    setTimeout(() => {
      navigate(RoutePaths.WIZARD)
    }, 4000)
  }

  const onNext = () => {
    dispatch(
      signupAppendForm({ enterpriseFeatures: selectedEnterpriseFeatures }),
    )
    redirectToWizard()
  }

  const onSkip = () => {
    dispatch(signupAppendForm({ enterpriseFeatures: [] }))
    redirectToWizard()
  }

  const onSelectAll = () => {
    if (hasSelectedAll) {
      setSelectedEnterpriseFeatures([])
    } else {
      setSelectedEnterpriseFeatures(
        ENTERPRISE_FEATURES_ITEMS.map(({ id }) => id),
      )
    }
  }

  const onItemClick = (selectedId: EnterpriseFeatureId) => () => {
    setSelectedEnterpriseFeatures(prev => {
      if (prev.includes(selectedId)) return prev.filter(id => id !== selectedId)
      return [...prev, selectedId]
    })
  }

  const [showOptions, setShowOptions] = useState(
    selectedEnterpriseFeatures.length > 0,
  )
  const showOptionsOnClick = () => setShowOptions(true)

  return (
    <StepContainer
      title="Looking for enterprise‑grade control and support?"
      description="Get advanced security, enterprise controls, and a dedicated CSM. We'll tailor your plan in a quick call with our sales team."
    >
      <div className="flex flex-col gap-6">
        {!showOptions && (
          <div className="flex justify-end items-center gap-6">
            <button
              onClick={onSkip}
              className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
            >
              No, Continue without enterprise features
            </button>

            <Button
              iconTrailing={ArrowRight}
              onClick={showOptionsOnClick}
              size="sm"
            >
              Yes
            </Button>
          </div>
        )}

        {showOptions && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-end">
              <button
                onClick={onSelectAll}
                className="text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
              >
                {hasSelectedAll ? 'Unselect all' : 'Select all'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ENTERPRISE_FEATURES_ITEMS.map(feature => (
                <button
                  key={feature.id}
                  onClick={onItemClick(feature.id)}
                  className={cx(
                    'p-3 sm:p-4 h-20 sm:h-24 rounded-lg border text-left transition-all hover:shadow-sm flex flex-col justify-center',
                    selectedEnterpriseFeatures.includes(feature.id)
                      ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                      : 'border-secondary hover:border-primary',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <feature.icon className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-primary text-xs sm:text-sm mb-1 truncate">
                        {feature.name}
                      </div>
                      <div className="text-xs text-tertiary line-clamp-2">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end items-center gap-6">
              <button
                onClick={onSkip}
                className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
              >
                Continue without enterprise features
              </button>

              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                isDisabled={selectedEnterpriseFeatures.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {showEnterpriseSuccess && <SignupEnterpriseStepSuccess />}
      </div>
    </StepContainer>
  )
}
