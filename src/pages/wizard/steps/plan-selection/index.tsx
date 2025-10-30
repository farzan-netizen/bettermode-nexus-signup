import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { getRecommendedPlan, generatePlanRecommendationText } from './utils'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectBrandState } from '@/store/brand'
import { signupAppendForm, signupSelectForm } from '@/store/signup'
import { StepContainer } from '@/pages/step-container'
import { IntegrationLogos } from './integration-logos'
import { PLANS_OPTIONS } from './constants'
import { WizardPlanSelectionStepHeader } from './header'
import { wizardSelectBillingPeriod } from '@/store/wizard'

export const WizardPlanSelectionStep = () => {
  const formData = useAppSelector(signupSelectForm)

  const brandData = useAppSelector(selectBrandState)
  const [isLoading, setIsLoading] = useState(false)
  const billingPeriod = useAppSelector(wizardSelectBillingPeriod)

  const recommendedPlanType = getRecommendedPlan(formData)

  const dispatch = useAppDispatch()
  const onSetSelectedPlan = (id: string) => {
    dispatch(signupAppendForm({ selectedPlan: id }))
  }

  const onSubmit = () => {
    setIsLoading(true)
  }
  // Get community name from wizard data if available
  const getCommunityName = () => {
    try {
      const wizardData = sessionStorage.getItem('wizard-form-data')
      if (wizardData) {
        const parsedData = JSON.parse(wizardData)
        return parsedData.communityName || formData.firstName
      }
    } catch (error) {
      console.error('Error parsing wizard data:', error)
    }
    return formData.firstName
  }

  return (
    <StepContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 w-full">
        <div className="flex flex-col gap-8">
          <div className="text-left mt-24">
            <div className="space-y-4">
              <TypingAnimation
                startOnView={true}
                duration={45}
                className="text-xl text-primary leading-relaxed font-normal text-left"
              >
                {formData
                  ? generatePlanRecommendationText(
                      formData,
                      recommendedPlanType,
                      brandData,
                    )
                  : null}
              </TypingAnimation>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <WizardPlanSelectionStepHeader />

          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {PLANS_OPTIONS.map((plan, index) => (
              <div
                key={plan.id}
                className={cx(
                  'relative p-3 sm:p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md flex flex-col',
                  formData.selectedPlan === plan.id
                    ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                    : plan.id === recommendedPlanType
                      ? 'border-brand-300 bg-brand-primary_alt hover:border-brand-400'
                      : 'border-secondary hover:border-primary',
                  'min-h-[350px] sm:min-h-[400px]',
                  plan.id === 'enterprise' &&
                    billingPeriod === 'monthly' &&
                    'opacity-20',
                  // Add divider after first card
                  index === 0 &&
                    "xl:after:content-[''] xl:after:absolute xl:after:-right-2 xl:after:top-0 xl:after:bottom-0 xl:after:w-px xl:after:bg-secondary/30",
                )}
                onClick={() => onSetSelectedPlan(plan.id)}
              >
                {plan.id === recommendedPlanType && (
                  <div className="absolute -top-4 left-3 ">
                    <span
                      className="text-[0.8rem] font-medium px-3 py-1 rounded-md"
                      style={{ backgroundColor: '#BFEACF', color: '#097444' }}
                    >
                      Recommended based on your needs
                    </span>
                  </div>
                )}

                <div className="mb-3">
                  <div className="mb-2">
                    <h3 className="text-base font-semibold text-primary">
                      {plan.name}
                    </h3>
                  </div>
                  <div className=" min-h-[66px] flex flex-col justify-center">
                    {billingPeriod === 'annual' &&
                    plan.annualPrice &&
                    plan.price !== plan.annualPrice ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[0.9rem] font-bold line-through text-quaternary">
                            {plan.price}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-1 py-0.5 rounded-md">
                            Save{' '}
                            {Math.round(
                              ((parseFloat(
                                plan.price.replace('$', '').replace(',', ''),
                              ) -
                                parseFloat(
                                  plan.annualPrice
                                    .replace('$', '')
                                    .replace(',', ''),
                                )) /
                                parseFloat(
                                  plan.price.replace('$', '').replace(',', ''),
                                )) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary">
                            {plan.annualPrice}
                          </span>
                          <span className="ml-1 text-tertiary">/m</span>
                          <span className="text-sm ml-2 text-quaternary">
                            {plan.annualTotal}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center h-full pb-1.5">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary">
                            {plan.price}
                          </span>
                          {plan.price !== 'Contact Us' && (
                            <span className="ml-1 text-tertiary">/m</span>
                          )}
                          {billingPeriod === 'monthly' &&
                            plan.monthlyTotal &&
                            plan.monthlyTotal !== 'Not Available' &&
                            plan.monthlyTotal !== 'Contact Us' && (
                              <span className="text-sm ml-2 text-quaternary">
                                {plan.monthlyTotal}
                              </span>
                            )}
                        </div>
                        {billingPeriod === 'monthly' &&
                          plan.monthlyTotal === 'Not Available' && (
                            <div className="text-sm mt-1 font-medium text-primary">
                              Only Annually
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button - Moved to be right after price */}
                <div className="pt-4 border-t border-tertiary">
                  <Button
                    className={
                      plan.id === recommendedPlanType
                        ? 'w-full'
                        : 'w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    }
                    color={
                      plan.id === recommendedPlanType
                        ? plan.buttonStyle === 'primary'
                          ? 'primary'
                          : plan.buttonStyle === 'secondary'
                            ? 'secondary'
                            : 'tertiary'
                        : 'tertiary'
                    }
                    size="sm"
                    onClick={() => {
                      onSetSelectedPlan(plan.id)
                      // For trial buttons, log the community name for payment
                      if (plan.buttonText.includes('trial')) {
                        const communityName = getCommunityName()
                        console.log(
                          `Starting ${plan.buttonText} for: ${communityName}`,
                        )
                        // You can add payment logic here that uses communityName instead of formData.firstName
                      }
                      onSubmit()
                    }}
                    isLoading={isLoading && formData.selectedPlan === plan.id}
                  >
                    {plan.id === 'growth' ? 'Request a demo' : plan.buttonText}
                  </Button>

                  {/* 14-day trial link for Growth plan */}
                  {plan.id === 'growth' && (
                    <a
                      href="https://calendly.com/bettermode/demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full mt-3 text-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      14-day trial
                    </a>
                  )}

                  {/* Add spacing for Starter and Enterprise plans to match Growth plan height */}
                  {plan.id !== 'growth' && <div className="mt-3 h-6"></div>}
                </div>

                <div className="space-y-1 mb-4 mt-4 h-[216px] overflow-hidden">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs text-tertiary"
                    >
                      <feature.icon className="w-3 h-3 mr-2 text-quaternary" />
                      {feature.text}
                    </div>
                  ))}
                </div>

                <div className="mb-4 mt-4">
                  <p className="text-xs mb-3 text-quaternary">Integrations</p>
                  <IntegrationLogos planId={plan.id} />
                </div>

                {/* See details link at bottom */}
                <div className="mt-auto pt-4 border-t border-tertiary/30">
                  <a
                    href="https://bettermode.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs transition-colors text-quaternary hover:text-tertiary"
                  >
                    See details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepContainer>
  )
}
