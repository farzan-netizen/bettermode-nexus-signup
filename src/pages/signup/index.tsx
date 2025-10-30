import { SignupEmailStep } from './steps/email'
import { SignupEmailVerificationStep } from './steps/email-verification'
import { SignupBasicInfoStep } from './steps/basic-info'
import { SignupIndustryStep } from './steps/industry'
import { SignupRoleStep } from './steps/role'
import { SignupIntegrationsStep } from './steps/integrations'
import { SignupEnterpriseStep } from './steps/enterprise'
import { SignupSideBar } from './sidebar'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { signupGoToPrevStep, signupSelectCurrentStep } from '@/store/signup'
import { SIGNUP_TOTAL_STEPS } from './constants'
import { PageContainer } from '../page-container'
import { cx } from '@/utils/cx'

export const SignupPage = () => {
  const dispatch = useAppDispatch()
  const currentStep = useAppSelector(signupSelectCurrentStep)

  const handleBack = () => {
    dispatch(signupGoToPrevStep())
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
      contentClassName={cx(
        currentStep < 3 && 'max-w-sm sm:max-w-md',
        currentStep >= 3 && 'max-w-lg sm:max-w-xl md:max-w-2xl',
      )}
    >
      <div>{renderCurrentStep()}</div>
    </PageContainer>
  )
}
