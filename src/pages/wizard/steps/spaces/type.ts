import type { FC } from 'react'

export interface SpaceOption {
  id: string
  name: string
  description: string
  icon: FC<{ className?: string }>
  category: 'discussion' | 'content' | 'collaboration' | 'support'
}
