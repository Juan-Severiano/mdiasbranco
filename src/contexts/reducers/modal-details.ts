import { ActionType } from "../config";

export interface ModalDetailsState {
  modal: boolean
}

export type ModalDetailsType = 'OPEN' | 'CLOSE'

export const modalDetailsInitialState: ModalDetailsState = {
  modal: false
}

export const modalDetailsReducer = (state: ModalDetailsState, action: ActionType): ModalDetailsState => {
  switch (action.type) {
    case 'CHANGE-MODAL-DETAILS':
      return { modal: action.payload }
    default:
      return state
  }
}
