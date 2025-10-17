import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'

// Import types and utilities
import { SignupFormData } from './types'
import { validateStep, getRecommendedPlan } from './utils'
import { SAAS_TOOLS } from './constants'
import {
  BrandData,
  fetchBrandData,
  extractDomainFromEmail,
  shouldFetchBrandData,
} from '@/utils/brandfetch'

// Import step components
import { Step1Email } from './steps/step1-email'
import { Step2Verification } from './steps/step2-verification'
import { Step3BasicInfo } from './steps/step3-basic-info'
import { Step4Industry } from './steps/step4-industry'
import { Step5Role } from './steps/step5-role'
import { Step6Company } from './steps/step6-company'
import { Step7CompanySize } from './steps/step7-company-size'
import { Step8Website } from './steps/step8-website'
import { Step9Integrations } from './steps/step9-integrations'
import { Step10Enterprise } from './steps/step10-enterprise'
import { Step11PlanSelection } from './steps/step11-plan-selection'

// Import sidebar components
import { SidebarContent } from './sidebar/sidebar-content'
import { BrandDataModal } from '@/components/shared-assets/brand-data-modal'
import { TrialSuccess } from './trial-success'
import { EnterpriseSuccess } from './enterprise-success'
import { PageContainer } from '../page-container'
import { cx } from '../../utils/cx'

export const SignupPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [resendCooldown, setResendCooldown] = useState(0)
  const [showIndustrySearch, setShowIndustrySearch] = useState(false)
  const [showRoleSearch, setShowRoleSearch] = useState(false)
  const [customRole, setCustomRole] = useState('')
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>(
    'annual',
  )
  const [selectedSecurityLevel, setSelectedSecurityLevel] = useState<
    'basic' | 'enterprise' | null
  >(null)

  // Brand data states
  const [brandData, setBrandData] = useState<BrandData | null>(null)
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [isFetchingBrand, setIsFetchingBrand] = useState(false)

  // Trial success state
  const [showTrialSuccess, setShowTrialSuccess] = useState(false)

  // Enterprise success state
  const [showEnterpriseSuccess, setShowEnterpriseSuccess] = useState(false)

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

  // Effect to fetch brand data when email changes
  useEffect(() => {
    const fetchBrand = async () => {
      if (formData.email && shouldFetchBrandData(formData.email)) {
        const domain = extractDomainFromEmail(formData.email)
        if (domain) {
          setIsFetchingBrand(true)
          try {
            const data = await fetchBrandData(domain)
            setBrandData(data)
          } catch (error) {
            console.error('Error fetching brand data:', error)
            setBrandData(null)
          } finally {
            setIsFetchingBrand(false)
          }
        }
      } else {
        setBrandData(null)
      }
    }

    // Debounce the API call
    const timeoutId = setTimeout(fetchBrand, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.email])

  const handleInputChange =
    (field: keyof SignupFormData) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))

      // Clear existing error for this field
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }

      // Trigger real-time validation for email and verification code fields
      if ((field === 'email' || field === 'verificationCode') && value.trim()) {
        const stepNumber = field === 'email' ? 1 : 2
        const newErrors = validateStep(stepNumber, {
          ...formData,
          [field]: value,
        })
        setErrors(prev => ({ ...prev, ...newErrors }))
      }
    }

  const handleGoogleAuth = async () => {
    // Set loading state
    setIsLoading(true)

    // Set Google auth data
    setFormData(prev => ({
      ...prev,
      email: 'amir@slack.com',
      authMethod: 'google',
      firstName: 'Amir',
      lastName: 'Khalilii',
      verificationCode: 'GOOGLE', // Set a dummy verification code
    }))

    // Clear any existing errors
    setErrors({})

    try {
      // Wait for brandfetch to complete
      const domain = extractDomainFromEmail('amir@slack.com')
      if (domain && shouldFetchBrandData('amir@slack.com')) {
        setIsFetchingBrand(true)
        const data = await fetchBrandData(domain)
        setBrandData(data)
        setIsFetchingBrand(false)
      }

      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))

      // Jump directly to step 3
      setCurrentStep(3)
    } catch (error) {
      console.error('Error during Google auth:', error)
      setBrandData(null)
      setIsFetchingBrand(false)
      // Still proceed to step 3 even if brandfetch fails
      setCurrentStep(3)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArrayToggle =
    (field: 'currentTools' | 'enterpriseFeatures') => (value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value],
      }))
    }

  const handleResendCode = () => {
    // Simulate sending code
    setResendCooldown(30)

    // If current error is about expired code, change it to "Code has been sent"
    if (errors.verificationCode === 'Code has been expired, tap to resend') {
      setErrors(prev => ({ ...prev, verificationCode: 'Code has been sent' }))
    }

    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
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
        setShowEnterpriseSuccess(true)

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
    setCurrentStep(prev => {
      let prevStep = prev - 1

      // Skip steps 6, 7, 8 when going back - go directly from 9 to 5
      if (prev === 9) {
        prevStep = 5
      }

      return Math.max(prevStep, 1)
    })
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

  const handleSelectAllTools = () => {
    const allToolIds = SAAS_TOOLS.map(tool => tool.id)
    const allSelected = allToolIds.every(id =>
      formData.currentTools.includes(id),
    )

    if (allSelected) {
      // Unselect all tools
      setFormData(prev => ({ ...prev, currentTools: [] }))
    } else {
      // Select all tools
      setFormData(prev => ({ ...prev, currentTools: allToolIds }))
    }
  }

  const handleSecuritySelection = (level: 'basic' | 'enterprise') => {
    setSelectedSecurityLevel(level)

    if (level === 'basic') {
      // Clear enterprise features when choosing basic
      setFormData(prev => ({ ...prev, enterpriseFeatures: [] }))
    }
    // Don't auto-select all enterprise features when choosing enterprise
    // Let user select individually
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Email
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onSetAuthMethod={method =>
              setFormData(prev => ({ ...prev, authMethod: method }))
            }
            onGoogleAuth={handleGoogleAuth}
          />
        )
      case 2:
        return (
          <Step2Verification
            formData={formData}
            errors={errors}
            resendCooldown={resendCooldown}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onResendCode={handleResendCode}
            onEditEmail={() => setCurrentStep(1)}
            brandData={brandData}
            isFetchingBrand={isFetchingBrand}
            onShowBrandModal={() => setShowBrandModal(true)}
          />
        )
      case 3:
        return (
          <Step3BasicInfo
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        )
      case 4:
        return (
          <Step4Industry
            formData={formData}
            errors={errors}
            showIndustrySearch={showIndustrySearch}
            brandData={brandData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onShowIndustrySearch={setShowIndustrySearch}
          />
        )
      case 5:
        return (
          <Step5Role
            formData={formData}
            errors={errors}
            showRoleSearch={showRoleSearch}
            customRole={customRole}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onShowRoleSearch={setShowRoleSearch}
            onSetCustomRole={setCustomRole}
          />
        )
      case 6:
        return (
          <Step6Company
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        )
      case 7:
        return (
          <Step7CompanySize
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        )
      case 8:
        return (
          <Step8Website
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        )
      case 9:
        return (
          <Step9Integrations
            formData={formData}
            onArrayToggle={handleArrayToggle}
            onNext={handleNext}
            onSelectAllTools={handleSelectAllTools}
          />
        )
      case 10:
        return (
          <Step10Enterprise
            formData={formData}
            selectedSecurityLevel={selectedSecurityLevel}
            onSecuritySelection={handleSecuritySelection}
            onNext={handleNext}
            onArrayToggle={handleArrayToggle}
          />
        )
      case 11:
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

  const shouldShowBackButton = (step: number) => {
    // Show back button for steps 4, 5, 9, 10 (skipping 6,7,8)
    return step === 4 || step === 5 || (step >= 9 && step <= 10)
  }

  const getCurrentStep = () => {
    let adjustedStep = currentStep
    if (currentStep >= 9) {
      adjustedStep = currentStep - 3
    }

    return adjustedStep
  }

  return (
    <PageContainer
      hideSteps
      onBack={shouldShowBackButton(currentStep) ? handleBack : undefined}
      totalSteps={7}
      currentStep={getCurrentStep()}
      rightSideBar={
        currentStep !== 11 && (
          <div className="relative hidden w-full bg-tertiary lg:flex lg:flex-col lg:h-screen lg:overflow-hidden max-w-[30%]">
            <div className="flex flex-col justify-start mt-24 items-center h-full p-6 lg:p-8">
              <SidebarContent currentStep={currentStep} formData={formData} />
            </div>

            {/* Fixed Company Logos at Bottom - Only show for testimonial steps */}
            {currentStep >= 2 && currentStep <= 9 && (
              <div className="absolute bottom-8 left-6 right-6">
                <div className="grid grid-cols-4 gap-1 px-2">
                  {[
                    { src: '/logos/l_backup/CoachHub.svg', alt: 'CoachHub' },
                    { src: '/logos/l_backup/Ceros.svg', alt: 'Ceros' },
                    {
                      src: '/logos/l_backup/Flutterflow.svg',
                      alt: 'FlutterFlow',
                    },
                    { src: '/logos/l_backup/ibm.svg', alt: 'IBM' },
                    { src: '/logos/intercom-1.svg', alt: 'Intercom' },
                    { src: '/logos/l_backup/lenovo.svg', alt: 'Lenovo' },
                    { src: '/logos/l_backup/logitech.svg', alt: 'Logitech' },
                    { src: '/logos/l_backup/preply.svg', alt: 'Preply' },
                    {
                      src: '/logos/l_backup/Property 1=SuperOps, color=color.svg',
                      alt: 'SuperOps',
                    },
                    {
                      src: '/logos/l_backup/Property 1=Variant10, color=color.svg',
                      alt: 'Variant10',
                    },
                    { src: '/logos/l_backup/xano.svg', alt: 'Xano' },
                    { src: '/logos/l_backup/yoto.svg', alt: 'Yoto' },
                  ].map((logo, index) => (
                    <img
                      key={index}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-12 w-16 object-contain opacity-60 mx-auto logo-filter"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
    >
      <div
        className={cx(
          currentStep !== 11 &&
            currentStep > 3 &&
            'flex w-full flex-col pb-6 sm:pb-8 max-w-lg sm:max-w-xl md:max-w-2xl gap-4 sm:gap-6 md:gap-8',
          currentStep <= 3 &&
            'flex w-full flex-col pb-6 sm:pb-8 max-w-sm sm:max-w-md gap-4 sm:gap-6 md:gap-8',
        )}
      >
        {renderCurrentStep()}
        {/* Brand Data Modal */}
        <BrandDataModal
          isOpen={showBrandModal}
          onClose={() => setShowBrandModal(false)}
          brandData={brandData}
          isLoading={isFetchingBrand}
        />
        {/* Trial Success Screen - Full Screen like Wizard */}
        {showTrialSuccess && (
          <TrialSuccess
            firstName={formData.firstName}
            companyName={formData.companyName}
          />
        )}
        {/* Enterprise Success Screen - Full Screen like Wizard */}
        {showEnterpriseSuccess && <EnterpriseSuccess />}
      </div>
    </PageContainer>
  )
}
