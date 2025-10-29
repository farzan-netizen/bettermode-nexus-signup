import {
  Users01,
  Database01,
  Globe01,
  TrendUp01,
  Star01,
  Mail01,
  Lock01,
  Headphones01,
  CheckCircle,
  Zap,
  Shield01,
  Code01,
  Settings01,
  User01,
  CreditCard01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { getRecommendedPlan, generatePlanRecommendationText } from './utils'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectBrandState } from '@/store/brand'
import { signupAppendForm, signupSelectForm } from '@/store/signup'
import { StepContainer } from '@/pages/step-container'

export const Step11PlanSelection = () => {
  const formData = useAppSelector(signupSelectForm)

  const brandData = useAppSelector(selectBrandState)
  const [isLoading, setIsLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>(
    'annual',
  )

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

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$399',
      period: '/month',
      annualPrice: '$333',
      annualPeriod: '/month',
      annualTotal: '($4,000/year)',
      monthlyTotal: '($4,788/year)',
      members: '10,000',
      collaborators: '3',
      spaces: '100',
      storage: '1TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 10,000 members and 3 collaborators' },
        { icon: Database01, text: '100 spaces and 1TB storage' },
        { icon: Globe01, text: 'Custom Domain' },
        { icon: TrendUp01, text: 'Basic Analytics' },
        { icon: Star01, text: 'Core apps: Q&A, Discussion, Events, Polls' },
        { icon: Mail01, text: 'Private messaging & chat' },
        { icon: Lock01, text: 'Social login' },
        { icon: Headphones01, text: 'Chat & Email Support' },
      ],
      buttonText: '14-days trial',
      buttonStyle: 'primary',
      recommended: recommendedPlanType === 'starter',
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$1,750',
      period: '/month',
      annualPrice: '$1,500',
      annualPeriod: '/month',
      annualTotal: '($18,000/year)',
      monthlyTotal: '($21,000/year)',
      members: '25,000',
      collaborators: '10',
      spaces: '200',
      storage: '3TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 25,000 members and 10 collaborators' },
        { icon: Database01, text: '200 spaces and 3TB storage' },
        { icon: CheckCircle, text: 'Everything in Starter' },
        { icon: Zap, text: 'Ask AI and Federated search' },
        { icon: Shield01, text: "Remove 'Powered by Bettermode'" },
        { icon: Mail01, text: 'Sender email customization' },
        { icon: Code01, text: 'API, Webhooks, and Sandbox Environment' },
        { icon: Settings01, text: 'Activity Log' },
        { icon: Headphones01, text: 'Onboarding and Migration Support' },
        { icon: Lock01, text: 'OAuth2' },
      ],
      buttonText: '14-day trial',
      buttonStyle: 'primary',
      recommended: recommendedPlanType === 'growth',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Contact Us',
      period: '',
      annualPrice: null,
      annualPeriod: null,
      annualTotal: '',
      monthlyTotal: 'Contact Us',
      members: '50,000',
      collaborators: '20',
      spaces: '500',
      storage: '5TB',
      description: '',
      features: [
        { icon: Users01, text: 'Up to 50,000 members and 20 collaborators' },
        { icon: Database01, text: '500 spaces and 5TB storage' },
        { icon: CheckCircle, text: 'Everything in Growth' },
        { icon: Settings01, text: 'Audit log (90 days)' },
        { icon: Shield01, text: 'SOC II, JWT, and SAML' },
        { icon: User01, text: 'Customer Success Manager' },
        { icon: TrendUp01, text: '99.9% Uptime SLA' },
        { icon: CreditCard01, text: 'Custom billing' },
        { icon: Lock01, text: 'Security and legal review' },
      ],
      buttonText: 'Talk to Sales',
      buttonStyle: 'primary',
      recommended: recommendedPlanType === 'enterprise',
    },
  ]

  const renderIntegrationLogos = (planId: string) => {
    const starterLogos = [
      '/logos/s/google-analytics-3.svg',
      '/logos/s/cookie-svgrepo-com.svg',
      '/logos/s/zapier.svg',
      '/logos/s/make.svg',
      '/logos/s/slack-new-logo.svg',
      '/logos/s/discord.svg',
      '/logos/s/mailchimp logo.svg',
    ]

    const growthEnterpriseLogos = [
      ...starterLogos,
      '/logos/s/google-tag-manager logo.svg',
      '/logos/s/Custom-Code-Snippet.svg',
      '/logos/s/Usercentrics_idibjbvDVZ_0.svg',
      '/logos/s/OneTrust.svg',
      '/logos/s/fullstory-logo.svg',
      '/logos/s/hotjar-icon logo.svg',
      '/logos/s/amplitude-icon logo.svg',
      '/logos/s/Mixpanel_Symbol_0.svg',
      '/logos/s/hubspot-1.svg',
      '/logos/s/zendesk-3.svg',
      '/logos/s/intercom-2.svg',
      '/logos/s/Jira logo.svg',
      '/logos/s/salesforce.svg',
    ]

    const logos = planId === 'starter' ? starterLogos : growthEnterpriseLogos

    return (
      <div className="flex flex-wrap gap-2 justify-start">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt=""
            className={cx(
              'w-4.5 h-4.5 rounded',
              (logo.includes('cookie-svgrepo-com') ||
                logo.includes('Custom-Code-Snippet')) &&
                'logo-filter',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <StepContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 w-full">
        {/* Left Side - Recommendation Text */}
        <div className="flex flex-col gap-8">
          <div className="text-left mt-24">
            {/* Advanced Recommendation Text with Typing Animation */}
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

        {/* Right Side - Pricing Cards */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-semibold text-primary">
              Choose your plan
            </h2>
            <div className="flex items-center gap-3 mx-auto sm:mx-0">
              <span
                className={cx(
                  'text-sm font-medium transition-colors',
                  billingPeriod === 'monthly'
                    ? 'text-primary'
                    : 'text-tertiary',
                )}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingPeriod(
                    billingPeriod === 'annual' ? 'monthly' : 'annual',
                  )
                }
                className={cx(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
                  billingPeriod === 'annual' ? 'bg-gray-900' : 'bg-gray-300',
                )}
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                <span
                  className={cx(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    billingPeriod === 'annual'
                      ? 'translate-x-6'
                      : 'translate-x-1',
                  )}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={cx(
                    'text-sm font-medium transition-colors',
                    billingPeriod === 'annual'
                      ? 'text-primary'
                      : 'text-tertiary',
                  )}
                >
                  Yearly
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {(() => {
              // Display plans in natural order: Starter, Growth, Enterprise
              const orderedPlans = plans.sort((a, b) => {
                const order = { starter: 1, growth: 2, enterprise: 3 }
                return (
                  order[a.id as keyof typeof order] -
                  order[b.id as keyof typeof order]
                )
              })
              return orderedPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={cx(
                    'relative p-3 sm:p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md flex flex-col',
                    formData.selectedPlan === plan.id
                      ? 'border-brand-solid bg-brand-primary/50 shadow-sm'
                      : plan.recommended
                        ? 'border-brand-300 bg-brand-primary_alt hover:border-brand-400'
                        : 'border-secondary hover:border-primary',
                    'min-h-[350px] sm:min-h-[400px]',
                    plan.id === 'enterprise' &&
                      billingPeriod === 'monthly' &&
                      'opacity-20',
                    // Add divider after first card
                    index === 0 &&
                      orderedPlans.length > 1 &&
                      "xl:after:content-[''] xl:after:absolute xl:after:-right-2 xl:after:top-0 xl:after:bottom-0 xl:after:w-px xl:after:bg-secondary/30",
                  )}
                  onClick={() => onSetSelectedPlan(plan.id)}
                >
                  {plan.recommended && (
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
                                    plan.price
                                      .replace('$', '')
                                      .replace(',', ''),
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
                        plan.recommended
                          ? 'w-full'
                          : 'w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                      }
                      color={
                        plan.recommended
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
                      {plan.id === 'growth'
                        ? 'Request a demo'
                        : plan.buttonText}
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
                    {renderIntegrationLogos(plan.id)}
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
              ))
            })()}
          </div>
        </div>
      </div>
    </StepContainer>
  )
}
