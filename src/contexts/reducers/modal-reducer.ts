import { ActionType } from "../config";

export interface ModalState {
  modal: boolean
}

export type ModalType = 'OPEN' | 'CLOSE'

export const modalInitialState: ModalState = {
  modal: false
}

export const modalReducer = (state: ModalState, action: ActionType): ModalState => {
  switch (action.type) {
    case 'CHANGE-MODAL':
      return { modal: action.payload }
    default:
      return state
  }
}
