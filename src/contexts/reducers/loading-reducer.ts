import { ActionType } from "../config";

export interface LoadingState {
  loading: boolean
}

export type ModalType = 'LOADING' | 'LOADED'

export const loadingInitialState: LoadingState = {
  loading: false
}

export const loadingReducer = (state: LoadingState, action: ActionType): LoadingState => {
  switch (action.type) {
    case 'CHANGE-LOADING':
      return { loading: action.payload }
    default:
      return state
  }
}
