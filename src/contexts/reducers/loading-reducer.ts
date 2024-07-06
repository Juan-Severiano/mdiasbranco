import { ActionType } from "../config";

export interface LoadingState {
  loading: boolean
  refresh: boolean
}

export type ModalType = 'LOADING' | 'LOADED'

export const loadingInitialState: LoadingState = {
  loading: false,
  refresh: false
}

export const loadingReducer = (state: LoadingState, action: ActionType): LoadingState => {
  switch (action.type) {
    case 'CHANGE-LOADING':
      return { ...state, loading: action.payload }
    case 'CHANGE-REFRESH':
      return { ...state, refresh: action.payload }
    default:
      return state
  }
}
