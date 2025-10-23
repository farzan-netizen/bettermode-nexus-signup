import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { StepContainer } from '../../step-container'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupAppendForm,
  signupGoToNextStep,
  signupSelectFirstName,
  signupSelectLastName,
} from '@/store/signup'

export const SignupBasicInfoStep = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
  })

  const storeFirstName = useAppSelector(signupSelectFirstName)
  const storeLastName = useAppSelector(signupSelectLastName)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setFirstName(storeFirstName || '')
  }, [storeFirstName])

  useEffect(() => {
    setLastName(storeLastName || '')
  }, [storeLastName])

  const onFirstNameChange = (value: string) => {
    setErrors(prev => ({ ...prev, firstName: '' }))
    setFirstName(value)
  }

  const onLastNameChange = (value: string) => {
    setErrors(prev => ({ ...prev, lastName: '' }))
    setLastName(value)
  }

  const onNext = () => {
    // TODO: add validation via api
    const isFirstNameEmpty = !firstName.trim()
    const isLastNameEmpty = !lastName.trim()
    if (isFirstNameEmpty || isLastNameEmpty) {
      setErrors({
        firstName: isFirstNameEmpty ? 'First name is required' : '',
        lastName: isLastNameEmpty ? 'Last name is required' : '',
      })
      return
    }
    dispatch(signupAppendForm({ firstName, lastName }))
    dispatch(signupGoToNextStep())
  }

  return (
    <StepContainer title="What is your name?">
      <div className="flex flex-col gap-6">
        <Input
          label="First name"
          placeholder=""
          value={firstName}
          onChange={onFirstNameChange}
          isInvalid={!!errors.firstName}
          hint={errors.firstName}
          isRequired
        />

        <Input
          label="Last name"
          placeholder=""
          value={lastName}
          onChange={onLastNameChange}
          isInvalid={!!errors.lastName}
          hint={errors.lastName}
          isRequired
        />

        <div className="flex justify-end">
          <Button
            iconTrailing={ArrowRight}
            onClick={onNext}
            size="sm"
            isDisabled={!firstName.trim() || !lastName.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}
