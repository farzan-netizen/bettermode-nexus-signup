import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { cx } from '@/utils/cx'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupAppendForm,
  signupGoToNextStep,
  signupSelectFirstName,
  signupSelectRole,
} from '@/store/signup'
import { useState } from 'react'
import { ROLE_OPTION_ITEMS, ROLE_OPTIONS_MAP } from './constant'
import { StepContainer } from '@/pages/step-container'

export const SignupRoleStep = () => {
  const firstName = useAppSelector(signupSelectFirstName)
  const selectedRole = useAppSelector(signupSelectRole)
  const [error, setError] = useState('')

  const isCustomRole = !!selectedRole && !(selectedRole in ROLE_OPTIONS_MAP)
  const [showRoleSearch, setShowRoleSearch] = useState(isCustomRole)
  const [customRole, setCustomRole] = useState(isCustomRole ? selectedRole : '')

  const dispatch = useAppDispatch()
  const onNext = () => {
    // TODO: handle error
    if (!selectedRole) {
      // setError('Role is required')
      // return
    }
    dispatch(signupGoToNextStep())
  }

  const onRoleOnClick = (id: string) => () => {
    setError('')
    dispatch(signupAppendForm({ role: id }))
    // If "Other" is selected, immediately show search input
    if (id === 'OTHER') {
      setShowRoleSearch(true)
    } else {
      // Auto-advance to next step after selection
      onNext()
    }
  }

  const onCustomRoleOnClick = () => {
    setError('')
    dispatch(signupAppendForm({ role: customRole }))
    onNext()
  }

  return (
    <StepContainer
      title="Which best describes your role?"
      topSlot={
        <div className="">
          <p className="text-lg text-tertiary">
            Dear <span className="font-bold">{firstName}</span>,
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ROLE_OPTION_ITEMS.map(role => (
            <button
              key={role.id}
              onClick={onRoleOnClick(role.id)}
              className={cx(
                'p-3 sm:p-4 rounded-lg border text-center transition-all hover:shadow-sm h-14 sm:h-16 flex items-center justify-center',
                selectedRole === role.id
                  ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                  : 'border-secondary hover:border-primary',
              )}
            >
              <span className="text-xs sm:text-sm font-medium text-primary">
                {role.name}
              </span>
            </button>
          ))}
        </div>

        {showRoleSearch ? (
          <div className="flex flex-col gap-4">
            <Input
              label="Describe your role"
              placeholder="Type your role..."
              value={customRole}
              onChange={setCustomRole}
              autoFocus
            />

            <div className="flex justify-end items-center gap-6">
              <button
                onClick={onNext}
                className="text-sm text-tertiary hover:text-tertiary_hover underline decoration-transparent hover:decoration-tertiary underline-offset-2 transition-all"
              >
                Skip, and Continue →
              </button>

              {customRole.trim() && (
                <Button
                  iconTrailing={ArrowRight}
                  onClick={onCustomRoleOnClick}
                  size="sm"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        ) : null}

        {error && (
          <p className="text-sm text-error-primary text-center">{error}</p>
        )}
      </div>
    </StepContainer>
  )
}
