import { ArrowLeft } from '@untitledui/icons/ArrowLeft'
import { ReactNode } from 'react'
import { ToggleTheme } from '@/components/ui/toggle-theme'
import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'

interface Props {
  currentStep: number
  totalSteps: number
  hideSteps?: boolean
  onBack?: () => void
  children?: ReactNode
  rightSideBar?: ReactNode
  contentClassName?: string
}
export const PageContainer = ({
  currentStep,
  totalSteps,
  hideSteps,
  onBack,
  children,
  rightSideBar,
  contentClassName,
}: Props) => {
  return (
    <section className="flex h-screen bg-primary overflow-hidden">
      <div className="flex w-full lg:w-1/2 grow flex-col h-full overflow-hidden">
        <header className="flex flex-col gap-4 px-4 py-4 sm:gap-6 sm:py-6 sm:px-6 md:px-8 lg:px-8 xl:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 h-8 w-max items-center justify-start overflow-visible max-md:hidden">
              <img
                src="/logo-bettermode.svg"
                alt="bettermode"
                className="h-6 w-auto logo-filter"
              />
              <ToggleTheme />
            </div>

            <div className="flex gap-2 items-center justify-center md:hidden">
              <img
                src="/logo-bettermode.svg"
                alt="bettermode"
                className="h-8 w-auto logo-filter"
              />
              <ToggleTheme />
            </div>

            {!hideSteps && (
              <div className="text-sm text-tertiary">
                Step {currentStep} of {totalSteps}
              </div>
            )}
          </div>

          <div className="w-full bg-secondary rounded-full h-1">
            <div
              className="h-full bg-brand-secondary rounded-full transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />
          </div>
        </header>

        <div className="overflow-y-auto scrollbar-thin flex flex-col py-6 sm:py-8 xl:py-8 px-4 md:px-6 lg:px-8">
          <div className={cx('mx-auto w-full', contentClassName)}>
            {currentStep > 1 && onBack && (
              <div className="mb-1">
                <button
                  onClick={onBack}
                  className="cursor-pointer inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            )}
            <div>{children}</div>
          </div>
        </div>
        {onBack && currentStep > 1 && (
          <div className="lg:hidden p-4 border-t border-secondary mt-auto flex">
            <Button
              className="flex-1"
              color="secondary"
              iconLeading={ArrowLeft}
              onClick={onBack}
              size="md"
            >
              Back
            </Button>
          </div>
        )}
      </div>

      {rightSideBar}
    </section>
  )
}
