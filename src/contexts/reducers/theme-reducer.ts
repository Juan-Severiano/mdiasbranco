import { ThemeState } from "../../types/reducers/theme-reducer";
import { ActionType } from "../config";

export const themeInitialState: ThemeState = {
  theme: 'light'
}

export const themeReducer = (state: ThemeState, action: ActionType): ThemeState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { theme: action.payload }
    default:
      return state
  }
}
