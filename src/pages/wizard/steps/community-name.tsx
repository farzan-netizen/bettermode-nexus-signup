import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  wizardAppendForm,
  wizardGoToNextStep,
  wizardSelectCommunityName,
  wizardSelectExistingCommunityName,
} from '@/store/wizard'
import { StepContainer } from '@/pages/step-container'

enum ViewStep {
  Initial = 'initial',
  CreateNew = 'create-new',
  Migrate = 'migrate',
}
export const WizardCommunityNameStep = () => {
  const existingCommunityName =
    useAppSelector(wizardSelectExistingCommunityName) || ''
  const communityName = useAppSelector(wizardSelectCommunityName) || ''

  const [viewStep, setViewStep] = useState<ViewStep>(() => {
    if (existingCommunityName) return ViewStep.Migrate
    if (communityName) return ViewStep.CreateNew
    return ViewStep.Initial
  })

  const dispatch = useAppDispatch()

  const onNext = () => {
    // TODO: validate via api
    dispatch(wizardGoToNextStep())
  }

  const setViewToMigrateCommunity = () => {
    setViewStep(ViewStep.Migrate)
  }

  const setViewToCreateNewCommunity = () => {
    setViewStep(ViewStep.CreateNew)
  }

  const onNewCommunityNameChange = (value: string) => {
    dispatch(
      wizardAppendForm({ communityName: value, existingCommunityName: '' }),
    )
  }

  const onExistingCommunityNameChange = (value: string) => {
    dispatch(
      wizardAppendForm({ existingCommunityName: value, communityName: '' }),
    )
  }

  return (
    <StepContainer
      title="Ready to start?"
      description="Create a new community, but if you already have one on another platform, we can help you migrate."
    >
      <div className="flex flex-col gap-6">
        {viewStep === ViewStep.Initial && (
          <div className="flex justify-start items-center gap-6">
            <button
              onClick={setViewToMigrateCommunity}
              className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
            >
              I want to migrate my existing community
            </button>

            <Button
              iconTrailing={ArrowRight}
              onClick={setViewToCreateNewCommunity}
              size="sm"
            >
              Create a new community
            </Button>
          </div>
        )}

        {viewStep === ViewStep.Migrate && (
          <div className="flex flex-col gap-6">
            <div>
              <Input
                label="Current community URL"
                type="url"
                placeholder="e.g., https://mycommunity.com"
                value={existingCommunityName}
                onChange={onExistingCommunityNameChange}
                hint={
                  'Enter the URL of your existing community that you want to migrate.'
                }
                isRequired
                isInvalid={false}
              />
            </div>

            <div className="flex justify-end items-center gap-6">
              <button
                onClick={setViewToCreateNewCommunity}
                className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
              >
                Create new community instead
              </button>

              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                isDisabled={!existingCommunityName?.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {viewStep === ViewStep.CreateNew && (
          <div className="flex flex-col gap-6">
            <div>
              <Input
                label="Community name"
                type="text"
                placeholder="e.g., Acme Community"
                value={communityName}
                onChange={onNewCommunityNameChange}
                hint={"We'll use this name across your workspace and emails."}
                isRequired
                isInvalid={false}
              />
            </div>

            <div className="flex justify-end items-center gap-6">
              <button
                onClick={setViewToMigrateCommunity}
                className="text-sm text-brand-secondary hover:text-brand-secondary_hover underline decoration-brand-secondary hover:decoration-brand-secondary underline-offset-2 transition-all cursor-pointer hover:cursor-pointer font-medium"
              >
                I have an existing community
              </button>

              <Button
                iconTrailing={ArrowRight}
                onClick={onNext}
                size="sm"
                isDisabled={!communityName.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </StepContainer>
  )
}
