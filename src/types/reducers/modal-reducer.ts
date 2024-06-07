import { Problem } from "../problem"

type ChangeModal = {
  type: 'CHANGE-MODAL',
  payload: boolean
}

export type ModalAction = ChangeModal


type ChangeModalDetails = {
  type: 'CHANGE-MODAL-DETAILS',
  payload: {
    problem: Problem
  }
}

type CloseModalDetails = {
  type: 'CLOSE-MODAL-DETAILS'
}

export type ModalDetailsAction = ChangeModalDetails | CloseModalDetails
