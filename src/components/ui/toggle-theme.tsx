import { useTheme } from '@/providers/theme'
import { Monitor01 } from '@untitledui/icons/Monitor01'
import { Moon01 } from '@untitledui/icons/Moon01'
import { Sun } from '@untitledui/icons/Sun'

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme()
  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="size-5 text-fg-quaternary" />
    if (theme === 'dark')
      return <Moon01 className="size-5 text-fg-quaternary" />
    return <Monitor01 className="size-5 text-fg-quaternary" /> // System mode
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {getThemeIcon()}
    </div>
  )
}
