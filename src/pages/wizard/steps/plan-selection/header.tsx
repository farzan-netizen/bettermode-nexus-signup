import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { wizardAppendForm, wizardSelectBillingPeriod } from '@/store/wizard'
import { cx } from '@/utils/cx'

export const WizardPlanSelectionStepHeader = () => {
  const billingPeriod = useAppSelector(wizardSelectBillingPeriod)

  const dispatch = useAppDispatch()
  const setBillingPeriod = () => {
    dispatch(
      wizardAppendForm({
        billingPeriod: billingPeriod === 'annual' ? 'monthly' : 'annual',
      }),
    )
  }
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 className="text-2xl font-semibold text-primary">Choose your plan</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-primary">
            Choose your plan
          </h2>
          <div className="flex bg-secondary rounded-lg p-1 mx-auto sm:mx-0">
            <button
              onClick={setBillingPeriod}
              className={cx(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                billingPeriod === 'annual'
                  ? 'bg-primary text-primary shadow-sm'
                  : 'text-tertiary hover:text-primary',
              )}
            >
              Annually
            </button>
            <button
              onClick={setBillingPeriod}
              className={cx(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                billingPeriod === 'monthly'
                  ? 'bg-primary text-primary shadow-sm'
                  : 'text-tertiary hover:text-primary',
              )}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
