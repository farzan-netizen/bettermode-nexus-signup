import { Button } from '@/components/base/buttons/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  wizardAppendForm,
  wizardGoToNextStep,
  wizardSelectSpaces,
} from '@/store/wizard'
import { StepContainer } from '@/pages/step-container'
import { SpaceItem } from './space-item'
import { GROUPED_SPACES_ITEMS } from './constants'

export const WizardSpacesStep = () => {
  const selectedSpaces = useAppSelector(wizardSelectSpaces)
  const handleSpaceToggle = (spaceId: string) => {
    const isSelected = selectedSpaces.includes(spaceId)

    let newSpaces: string[] = []
    if (isSelected) {
      newSpaces = selectedSpaces.filter(id => id !== spaceId)
    } else {
      newSpaces = [...selectedSpaces, spaceId]
    }
    dispatch(wizardAppendForm({ spaces: newSpaces }))
  }
  const dispatch = useAppDispatch()

  const onNext = () => {
    dispatch(wizardGoToNextStep())
  }

  return (
    <StepContainer
      title="Activate your starting spaces"
      description="Pick a few spaces to shape your community. You can add more later."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GROUPED_SPACES_ITEMS.map((group, index) => (
            <div key={index}>
              <h3 className="text-xs font-medium text-tertiary mb-2">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.items.map(space => (
                  <SpaceItem
                    key={space.id}
                    space={space}
                    onClick={handleSpaceToggle}
                    isSelected={selectedSpaces.includes(space.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-tertiary">
            2–5 spaces recommended for a clean start.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            size="sm"
            isDisabled={selectedSpaces.length === 0}
          >
            Create my community
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}
