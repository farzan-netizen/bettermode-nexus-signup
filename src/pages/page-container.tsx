import { ArrowLeft } from '@untitledui/icons/ArrowLeft'
import { ReactNode } from 'react'
import { ToggleTheme } from '@/components/ui/toggle-theme'
import { Button } from '@/components/base/buttons/button'

interface Props {
  currentStep: number
  totalSteps: number
  hideSteps?: boolean
  onBack?: () => void
  title?: string
  children?: ReactNode
  rightSideBar?: ReactNode
  description?: string
}
export const PageContainer = ({
  currentStep,
  totalSteps,
  hideSteps,
  onBack,
  title,
  children,
  rightSideBar,
  description,
}: Props) => {
  return (
    <section className="flex h-screen bg-primary overflow-hidden">
      <div className="flex w-full lg:w-1/2 grow flex-col h-full overflow-hidden flex-shrink-0">
        <header className="flex flex-col gap-1 px-4 py-1 sm:gap-1.5 sm:py-1.5 sm:px-6 md:px-8 lg:px-8 xl:px-8 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 h-8 w-max items-center justify-start overflow-visible max-md:hidden px-[68px] py-[32px]">
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

        <div className="flex-1 flex flex-col overflow-y-hidden">
          <div className="grow flex justify-start items-start pt-[80px] pb-6 sm:pt-[80px] sm:pb-8 xl:pt-[80px] xl:pb-8 overflow-y-auto scrollbar-thin">
            <div className="flex w-full flex-col pb-6 sm:pb-8 pl-[100px] pr-[68px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  {currentStep > 1 && onBack && (
                    <div className="mb-1">
                      <button
                        onClick={onBack}
                        className="cursor-pointer inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors mb-3"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      {title && (
                        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
                          {title}
                        </h1>
                      )}
                      {description && (
                        <p className="text-md text-tertiary mt-2">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">{children}</div>
            </div>
          </div>
          {onBack && currentStep > 1 && (
            <div className="lg:hidden p-4 border-t border-secondary mt-auto">
              <div className="flex gap-3">
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
            </div>
          )}
        </div>
      </div>

      {rightSideBar}
    </section>
  )
}
