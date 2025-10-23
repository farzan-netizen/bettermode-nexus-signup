import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import {
  extractDomainFromEmail,
  fetchBrandData,
  shouldFetchBrandData,
} from '@/utils/brandfetch'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import {
  signupGoToNextStep,
  signupSelectEmail,
  signupSetCurrentStep,
  signupSetGoogleAuthData,
  signupAppendForm,
} from '@/store/signup'
import { setBrand } from '@/store/brand'
import { StepContainer } from '@/pages/step-container'
import { GoogleIcon } from '@/pages/signup/steps/email/google-icon'

export const SignupEmailStep = () => {
  const navigate = useNavigate()

  const storeEmail = useAppSelector(signupSelectEmail)
  const [email, setEmail] = useState(storeEmail || '')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const onGoogleAuth = async () => {
    setIsLoading(true)
    // TODO: add real google auth
    dispatch(
      signupSetGoogleAuthData({
        email: 'amir@slack.com',
        firstName: 'Amir',
        lastName: 'Khalilii',
      }),
    )

    setError('')

    // TODO: refactor brand fetch
    try {
      const domain = extractDomainFromEmail('amir@slack.com')
      if (domain && shouldFetchBrandData('amir@slack.com')) {
        const data = await fetchBrandData(domain)
        if (data) dispatch(setBrand(data))
      }

      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))

      // Jump directly to step 3
      dispatch(signupSetCurrentStep(3))
    } catch (error) {
      console.error('Error during Google auth:', error)
      dispatch(signupSetCurrentStep(3))
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (value: string) => {
    setError('')
    setEmail(value)
  }

  const onNext = () => {
    // TODO: validate email via api and fetch brand

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    // Check for personal email domains
    const personalEmailDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'protonmail.com',
      'yandex.com',
      'mail.ru',
      'zoho.com',
      'fastmail.com',
      'tutanota.com',
      'hey.com',
      'live.com',
      'msn.com',
    ]
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (emailDomain && personalEmailDomains.includes(emailDomain)) {
      setError(
        'Only work emails are acceptable. Please use your company email address.',
      )
      return
    }
    dispatch(signupAppendForm({ email }))
    dispatch(signupGoToNextStep())
  }

  const signInOnClick = () => {
    // TODO: update correct path
    navigate('/login')
  }

  return (
    <StepContainer
      title="First, enter your email"
      description="We need to use the email address you use at work."
    >
      <div className="flex flex-col gap-5">
        <Input
          type="email"
          placeholder="name@work-email.com"
          value={email}
          onChange={onChange}
          isInvalid={!!error}
          hint={error}
          isRequired
        />

        <Button
          className="w-full"
          iconTrailing={ArrowRight}
          onClick={onNext}
          size="md"
          isDisabled={!email?.trim() || !!error}
        >
          Continue
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-primary text-tertiary">or</span>
          </div>
        </div>

        <Button
          className="w-full"
          color="secondary"
          size="md"
          onClick={onGoogleAuth}
          isLoading={isLoading}
          isDisabled={isLoading}
          iconLeading={
            !isLoading
              ? ({ className }) => <GoogleIcon className={className} />
              : undefined
          }
        >
          {isLoading ? 'Authenticating...' : 'Continue with Google'}
        </Button>

        <div className="flex justify-start gap-1 text-left">
          <span className="text-sm text-tertiary">
            Already have an account?
          </span>
          <button
            onClick={signInOnClick}
            className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover"
          >
            Sign in
          </button>
        </div>

        <p className="text-xs text-tertiary text-left">
          By creating an account, you agree to our{' '}
          <a
            href="/terms"
            className="text-brand-secondary hover:text-brand-secondary_hover"
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="text-brand-secondary hover:text-brand-secondary_hover"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </StepContainer>
  )
}
