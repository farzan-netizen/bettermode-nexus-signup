import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { StepContainer } from '../../step-container'
import { OTPInput } from '@/components/base/otp-input'
import {
  signupGoToNextStep,
  signupGoToPrevStep,
  signupSelectEmail,
} from '@/store/signup'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useState } from 'react'

export const SignupEmailVerificationStep = () => {
  const email = useAppSelector(signupSelectEmail)
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const dispatch = useAppDispatch()

  const onChangeOTP = (updatedCode: string) => {
    setError('')
    setVerificationCode(updatedCode)
  }

  const onNext = () => {
    // TODO: add api call
    if (!verificationCode.trim()) {
      setError('Verification code is required')
      return
    }
    if (verificationCode === '111111') {
      setError('Incorrect code entered')
      return
    }
    if (verificationCode === '222222') {
      setError('Code has been expired, tap to resend')
      return
    }
    dispatch(signupGoToNextStep())
  }

  const onEditEmail = () => {
    dispatch(signupGoToPrevStep())
  }

  const onResendCode = () => {
    // Simulate sending code
    setResendTimer(30)

    // If current error is about expired code, change it to "Code has been sent"
    if (error === 'Code has been expired, tap to resend') {
      setError('Code has been sent')
    }

    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <StepContainer
      title="Check your email for a code"
      description={`We've sent a 6-character code to ${email}. The code expires shortly, so please enter it soon.`}
    >
      <div className="flex flex-col gap-6">
        <div className="mx-auto">
          <OTPInput
            value={verificationCode}
            numInputs={6}
            onChange={onChangeOTP}
          />
        </div>
        {error && (
          <p className="text-sm text-error-primary text-center">
            {error === 'Code has been expired, tap to resend' ? (
              <>
                Code has been expired, tap to{' '}
                <button
                  onClick={onResendCode}
                  className="text-black underline hover:no-underline cursor-pointer font-medium"
                >
                  resend
                </button>
              </>
            ) : error === 'Code has been sent' ? (
              <span className="text-green-600">Code has been sent</span>
            ) : (
              error
            )}
          </p>
        )}

        <Button
          className="w-full"
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="md"
          isDisabled={verificationCode.length !== 6 || !!error}
        >
          Next
        </Button>

        <div className="text-center space-y-3">
          <div className="text-sm text-tertiary">
            Didn't get the email?{' '}
            {resendTimer > 0 ? (
              <span className="text-quaternary">Resend in {resendTimer}s</span>
            ) : (
              <button
                onClick={onResendCode}
                className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
              >
                Resend
              </button>
            )}{' '}
            or{' '}
            <button
              onClick={onEditEmail}
              className="text-brand-secondary hover:text-brand-secondary_hover font-medium"
            >
              edit your email address
            </button>
          </div>

          <p className="text-sm text-tertiary">
            Can't find your code? Check your spam folder!
          </p>
        </div>
      </div>
    </StepContainer>
  )
}
