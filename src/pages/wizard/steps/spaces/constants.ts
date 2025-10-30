import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  File01,
  Folder,
  HelpCircle,
  Lightbulb01,
  MessageChatCircle,
  Rocket01,
} from '@untitledui/icons'
import type { SpaceOption } from './type'

export const SPACE_OPTIONS: SpaceOption[] = [
  {
    id: 'general-discussion',
    name: 'General Discussion',
    description: 'Open discussions and conversations',
    icon: MessageChatCircle,
    category: 'discussion',
  },
  {
    id: 'qa',
    name: 'Q&A',
    description: 'Questions and answers from the community',
    icon: HelpCircle,
    category: 'discussion',
  },
  {
    id: 'feedback',
    name: 'Feedback & Ideas',
    description: 'Collect feedback and feature requests',
    icon: Lightbulb01,
    category: 'discussion',
  },

  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Important updates and news',
    icon: AlertCircle,
    category: 'content',
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Articles and long-form content',
    icon: File01,
    category: 'content',
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Community events and meetups',
    icon: Calendar,
    category: 'content',
  },

  {
    id: 'projects',
    name: 'Projects',
    description: 'Collaborative projects and initiatives',
    icon: Rocket01,
    category: 'collaboration',
  },
  {
    id: 'resources',
    name: 'Resources',
    description: 'Shared files and documentation',
    icon: Folder,
    category: 'collaboration',
  },

  {
    id: 'help-support',
    name: 'Help & Support',
    description: 'Get help from the community',
    icon: HelpCircle,
    category: 'support',
  },
  {
    id: 'bug-reports',
    name: 'Bug Reports',
    description: 'Report issues and bugs',
    icon: AlertTriangle,
    category: 'support',
  },
]

const CATEGORY_TITLES: Record<SpaceOption['category'], string> = {
  discussion: 'Discussion',
  content: 'Content',
  collaboration: 'Collaboration',
  support: 'Support',
}

export const GROUPED_SPACES_MAP = SPACE_OPTIONS.reduce(
  (groups, space) => {
    const category = space.category
    if (!(category in groups)) {
      groups[category] = {
        title: CATEGORY_TITLES[category],
        items: [],
      }
    }
    groups[category].items.push(space)
    return groups
  },
  {} as Record<
    SpaceOption['category'],
    { items: typeof SPACE_OPTIONS; title: string }
  >,
)

export const GROUPED_SPACES_ITEMS = Object.values(GROUPED_SPACES_MAP)
