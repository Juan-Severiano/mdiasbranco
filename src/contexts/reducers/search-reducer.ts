import { ActionType } from "../config";

export interface SearchState {
  search: string
}

export type ModalType = 'LOADING' | 'LOADED'

export const searchInitialState: SearchState = {
  search: ''
}

export const searchReducer = (state: SearchState, action: ActionType): SearchState => {
  switch (action.type) {
    case 'SEARCH':
      return { search: action.payload }
    default:
      return state
  }
}
