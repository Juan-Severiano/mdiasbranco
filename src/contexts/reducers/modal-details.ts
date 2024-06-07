import { Problem } from "../../types/problem";
import { ActionType } from "../config";

export interface ModalDetailsState {
  modal: boolean
  problem: Problem | null
}

export type ModalDetailsType = 'OPEN' | 'CLOSE'

export const modalDetailsInitialState: ModalDetailsState = {
  modal: false,
  problem: null
}

export const modalDetailsReducer = (state: ModalDetailsState, action: ActionType): ModalDetailsState => {
  switch (action.type) {
    case 'CHANGE-MODAL-DETAILS':
      return { modal: true, problem: action.payload.problem }
    case 'CLOSE-MODAL-DETAILS':
      return { modal: false, problem: null }
    default:
      return state
  }
}
