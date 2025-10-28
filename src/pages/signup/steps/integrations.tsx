import { ArrowRight, Asterisk02 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'
import { SAAS_TOOLS_ITEMS, SAAS_TOOLS_MAP, type SaasToolId } from '../constants'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupAppendForm,
  signupGoToNextStep,
  signupSelectIntegrations,
} from '@/store/signup'
import { useMemo, useState } from 'react'
import { StepContainer } from '@/pages/step-container'

export const SignupIntegrationsStep = () => {
  const storeIntegrations = useAppSelector(signupSelectIntegrations)
  const [selectedIntegrations, setSelectedIntegrations] = useState(
    (storeIntegrations || []) as SaasToolId[],
  )

  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(signupAppendForm({ integrations: selectedIntegrations }))
    dispatch(signupGoToNextStep())
  }

  const onSkip = () => {
    dispatch(signupAppendForm({ integrations: [] }))
    dispatch(signupGoToNextStep())
  }

  const onItemClick = (selectedId: SaasToolId) => {
    setSelectedIntegrations(prev => {
      const isSelected = prev.includes(selectedId)
      if (isSelected) {
        return prev.filter(id => selectedId !== id)
      }
      return [...prev, selectedId]
    })
  }

  const hasSelectedAll = useMemo(
    () =>
      SAAS_TOOLS_ITEMS.every(tool => selectedIntegrations.includes(tool.id)),
    [selectedIntegrations],
  )

  const onSelectAll = () => {
    if (hasSelectedAll) setSelectedIntegrations([])
    else setSelectedIntegrations(SAAS_TOOLS_ITEMS.map(i => i.id))
  }

  const lastSelectedTool =
    selectedIntegrations.length > 0
      ? SAAS_TOOLS_MAP[selectedIntegrations[selectedIntegrations.length - 1]]
      : undefined

  return (
    <StepContainer
      title="Communities are much more powerful with awesome integrations"
      description="Choose as many as you want. It helps us guide you to the right plan."
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-end mb-3">
            <button
              onClick={onSelectAll}
              className="cursor-pointer text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover underline decoration-transparent hover:decoration-brand-secondary underline-offset-2 transition-all"
            >
              {hasSelectedAll ? 'Unselect all' : 'Select all'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SAAS_TOOLS_ITEMS.map(tool => (
              <div
                key={tool.id}
                className={cx(
                  'flex items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm',
                  selectedIntegrations.includes(tool.id)
                    ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                    : 'border-secondary hover:border-primary',
                )}
                onClick={() => onItemClick(tool.id)}
              >
                {tool.logo && (
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className={cx(
                        'max-w-full max-h-full object-contain',
                        (tool.id === 'cookie-consent' ||
                          tool.id === 'custom-code') &&
                          'logo-filter',
                      )}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-primary text-xs sm:text-sm truncate">
                    {tool.name}
                  </div>
                </div>

                {tool.isEnterprise && (
                  <div className="flex-shrink-0 ml-2">
                    <Asterisk02 className="w-3 h-3 text-purple-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {lastSelectedTool && (
            <div className="mt-4 bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4">
              <div className="flex flex-col items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img
                    src={lastSelectedTool.logo}
                    alt={lastSelectedTool.name}
                    className={cx(
                      'max-w-full max-h-full object-contain',
                      (lastSelectedTool.id === 'cookie-consent' ||
                        lastSelectedTool.id === 'custom-code') &&
                        'logo-filter',
                    )}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs text-tertiary">
                    <span className="font-medium text-primary">
                      ({lastSelectedTool.name})
                    </span>{' '}
                    + bettermode : {lastSelectedTool.description}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedIntegrations.some(
            tool => SAAS_TOOLS_MAP[tool].isEnterprise,
          ) && (
            <div className="mt-3 bg-secondary/30 rounded-lg p-3">
              <p className="text-xs text-tertiary text-left">
                <Asterisk02 className="w-3 h-3 inline mr-1 text-purple-500" />
                These integrations are only available in the Enterprise plan.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-6">
          <button
            onClick={onSkip}
            className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
          >
            No integrations needed for now
          </button>

          <Button
            iconTrailing={ArrowRight}
            onClick={onNext}
            size="sm"
            isDisabled={selectedIntegrations.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}
