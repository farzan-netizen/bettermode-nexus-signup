import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { SignupFormData } from './types'
import { validateStep, getRecommendedPlan } from './utils'
import { BrandData } from '@/utils/brandfetch'
import { SignupEmailStep } from './steps/email'
import { SignupEmailVerificationStep } from './steps/email-verification'
import { SignupBasicInfoStep } from './steps/basic-info'
import { SignupIndustryStep } from './steps/industry'
import { SignupRoleStep } from './steps/role'
import { SignupIntegrationsStep } from './steps/integrations'
import { SignupEnterpriseStep } from './steps/enterprise'
import { Step11PlanSelection } from './steps/step11-plan-selection'
import { TrialSuccess } from './trial-success'
import { PageContainer } from '../page-container'
import { cx } from '../../utils/cx'
import { SignupSideBar } from './sidebar'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { signupSelectCurrentStep, signupSetCurrentStep } from '@/store/signup'
import { SIGNUP_TOTAL_STEPS } from './constants'

export const SignupPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(signupSelectCurrentStep)
  const setCurrentStep = (v: number) => {
    dispatch(signupSetCurrentStep(v))
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>(
    'annual',
  )
  const [selectedSecurityLevel, setSelectedSecurityLevel] = useState<
    'basic' | 'enterprise' | null
  >(null)

  // Brand data states
  const [brandData, setBrandData] = useState<BrandData | null>(null)

  // Trial success state
  const [showTrialSuccess, setShowTrialSuccess] = useState(false)

  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    authMethod: 'email',
    verificationCode: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    primaryUseCase: '',
    currentTools: [],
    enterpriseFeatures: [],
    expectedUserCount: '',
    selectedPlan: 'pro',
  })

  // Effect to handle redirect from wizard to pricing
  useEffect(() => {
    if (location.state?.step === 11) {
      setCurrentStep(11)

      // Restore saved signup data from sessionStorage
      const savedFormData = sessionStorage.getItem('signup-form-data')
      const savedBrandData = sessionStorage.getItem('signup-brand-data')
      const savedBillingPeriod = sessionStorage.getItem('signup-billing-period')
      const savedSecurityLevel = sessionStorage.getItem('signup-security-level')

      if (savedFormData) {
        try {
          const parsedFormData = JSON.parse(savedFormData)
          setFormData(parsedFormData)
        } catch (error) {
          console.error('Error parsing saved form data:', error)
        }
      }

      if (savedBrandData) {
        try {
          const parsedBrandData = JSON.parse(savedBrandData)
          setBrandData(parsedBrandData)
        } catch (error) {
          console.error('Error parsing saved brand data:', error)
        }
      }

      if (savedBillingPeriod) {
        setBillingPeriod(savedBillingPeriod as 'annual' | 'monthly')
      }

      if (savedSecurityLevel) {
        setSelectedSecurityLevel(
          savedSecurityLevel as 'basic' | 'enterprise' | null,
        )
      }
    }
  }, [location.state])

  const handleArrayToggle =
    (field: 'currentTools' | 'enterpriseFeatures') => (value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value],
      }))
    }

  const handleValidateStep = (step: number): boolean => {
    const newErrors = validateStep(step, formData)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (skipValidation = false) => {
    if (skipValidation || handleValidateStep(currentStep)) {
      let nextStep = currentStep + 1

      // Skip steps 6, 7, 8 - go from 5 to 9
      if (currentStep === 5) {
        nextStep = 9
      }

      // Redirect to wizard after step 10 (enterprise)
      if (currentStep === 10) {
        // Store signup data before going to wizard
        sessionStorage.setItem('signup-form-data', JSON.stringify(formData))
        sessionStorage.setItem('signup-brand-data', JSON.stringify(brandData))
        sessionStorage.setItem('signup-billing-period', billingPeriod)
        sessionStorage.setItem(
          'signup-security-level',
          selectedSecurityLevel || '',
        )

        // Show enterprise success message
        // setShowEnterpriseSuccess(true)

        // Redirect to wizard after 4 seconds
        setTimeout(() => {
          navigate('/wizard')
        }, 4000)
        return
      }

      nextStep = Math.min(nextStep, 11)
      setCurrentStep(nextStep)

      // Auto-select recommended plan when reaching step 11
      if (nextStep === 11) {
        const recommendedPlan = getRecommendedPlan(formData, brandData)
        setFormData(prev => ({ ...prev, selectedPlan: recommendedPlan }))
      }
    }
  }

  const handleBack = () => {
    let prevStep = currentStep - 1
    if (currentStep === 9) {
      prevStep = 5
    }
    setCurrentStep(Math.max(prevStep, 1))
  }

  const handleSubmit = async () => {
    if (!handleValidateStep(currentStep)) return

    setIsLoading(true)
    try {
      // Simulate API call with the email (amir@slack.com for Google auth)
      const apiData = {
        ...formData,
        email:
          formData.authMethod === 'google' ? 'amir@slack.com' : formData.email,
      }

      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Signup data sent to API:', apiData)

      // Show trial success message
      setShowTrialSuccess(true)

      // Redirect to onboarding after 3 seconds
      setTimeout(() => {
        // Clean up stored data after successful signup
        sessionStorage.removeItem('signup-form-data')
        sessionStorage.removeItem('signup-brand-data')
        sessionStorage.removeItem('signup-billing-period')
        sessionStorage.removeItem('signup-security-level')
        navigate('/admin2/onboarding')
      }, 3000)
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignupEmailStep />
      case 2:
        return <SignupEmailVerificationStep />
      case 3:
        return <SignupBasicInfoStep />
      case 4:
        return <SignupIndustryStep />
      case 5:
        return <SignupRoleStep />

      case 6:
        return <SignupIntegrationsStep />
      case 7:
        return <SignupEnterpriseStep />
      case 8:
        return (
          <Step11PlanSelection
            formData={formData}
            billingPeriod={billingPeriod}
            isLoading={isLoading}
            brandData={brandData}
            onSetBillingPeriod={setBillingPeriod}
            onSetSelectedPlan={plan =>
              setFormData(prev => ({ ...prev, selectedPlan: plan }))
            }
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <PageContainer
      hideSteps
      onBack={handleBack}
      totalSteps={SIGNUP_TOTAL_STEPS}
      currentStep={currentStep}
      rightSideBar={<SignupSideBar />}
    >
      <div
        className={cx(
          currentStep !== SIGNUP_TOTAL_STEPS &&
            currentStep > 3 &&
            'flex w-full flex-col pb-6 sm:pb-8 max-w-lg sm:max-w-xl md:max-w-2xl gap-4 sm:gap-6 md:gap-8',
          currentStep <= 3 &&
            'flex w-full flex-col pb-6 sm:pb-8 max-w-sm sm:max-w-md gap-4 sm:gap-6 md:gap-8',
        )}
      >
        {renderCurrentStep()}
        {showTrialSuccess && (
          <TrialSuccess
            firstName={formData.firstName}
            companyName={formData.companyName}
          />
        )}
      </div>
    </PageContainer>
  )
}
