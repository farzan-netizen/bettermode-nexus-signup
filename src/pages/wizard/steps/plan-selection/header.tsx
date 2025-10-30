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
      <div className="flex items-center gap-3 mx-auto sm:mx-0">
        <span
          className={cx(
            'text-sm font-medium transition-colors',
            billingPeriod === 'monthly' ? 'text-primary' : 'text-tertiary',
          )}
        >
          Monthly
        </span>
        <button
          onClick={setBillingPeriod}
          className={cx(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
            billingPeriod === 'annual' ? 'bg-gray-900' : 'bg-gray-300',
          )}
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <span
            className={cx(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
        <div className="flex items-center gap-2">
          <span
            className={cx(
              'text-sm font-medium transition-colors',
              billingPeriod === 'annual' ? 'text-primary' : 'text-tertiary',
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
  )
}
