import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title?: string
  description?: string
  topSlot?: ReactNode
}
export const StepContainer = ({
  children,
  title,
  description,
  topSlot,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {topSlot}
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {title && (
              <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-md text-tertiary mt-2">{description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </div>
  )
}
