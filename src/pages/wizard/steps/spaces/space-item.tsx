import { cx } from '@/utils/cx'
import { Check } from '@untitledui/icons'
import type { SpaceOption } from '../../types'

interface Props {
  onClick: (id: SpaceOption['id']) => void
  space: SpaceOption
  isSelected?: boolean
}
export const SpaceItem = ({ onClick, space, isSelected }: Props) => {
  const { id, description, name, icon: Icon } = space
  const handleOnClick = () => {
    onClick(id)
  }
  return (
    <button
      onClick={handleOnClick}
      className={cx(
        'flex items-start gap-2 p-2 rounded-md border text-left transition-all w-full h-14',
        isSelected
          ? 'bg-brand-primary_alt border-brand-solid'
          : 'bg-primary border-tertiary hover:border-secondary hover:bg-secondary',
      )}
    >
      <Icon className="w-4 h-4 text-brand-secondary mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-primary truncate">
            {name}
          </span>
          {isSelected && <Check className="w-3 h-3 text-brand-solid" />}
        </div>
        <p className="text-[10px] text-tertiary leading-tight line-clamp-2">
          {description}
        </p>
      </div>
    </button>
  )
}
