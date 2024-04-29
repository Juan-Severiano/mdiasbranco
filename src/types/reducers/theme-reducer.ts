export type ThemeState = {
  theme: 'dark' | 'light'
}

type ChangeTheme = {
  type: 'CHANGE_THEME',
  payload: ThemeState['theme']
}

export type ThemeAction = ChangeTheme
