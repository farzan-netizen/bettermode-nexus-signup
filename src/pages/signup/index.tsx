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
import { cx } from '@/utils/cx'
import { PageContainer } from '../page-container'

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
    >
      <div
        className={cx(
          'flex w-full flex-col pb-6 sm:pb-8 md:gap-8 gap-4 sm:gap-6',
          currentStep > 3 && 'max-w-lg sm:max-w-xl md:max-w-2xl ',
          currentStep <= 3 && 'max-w-sm sm:max-w-md',
        )}
      >
        {renderCurrentStep()}
      </div>
    </PageContainer>
  )
}
