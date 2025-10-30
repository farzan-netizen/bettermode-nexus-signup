import { cx } from '@/utils/cx'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title?: string
  description?: string
  topSlot?: ReactNode
  className?: string
}
export const StepContainer = ({
  children,
  title,
  description,
  topSlot,
  className,
}: Props) => {
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {topSlot}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
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
