
type ChangeModal = {
  type: 'CHANGE-MODAL',
  payload: boolean
}

export type ModalAction = ChangeModal


type ChangeModalDetails = {
  type: 'CHANGE-MODAL-DETAILS',
  payload: boolean
}

export type ModalDetailsAction = ChangeModalDetails
