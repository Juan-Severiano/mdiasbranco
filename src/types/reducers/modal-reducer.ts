import { Problem } from "../problem"

type ChangeModal = {
  type: 'CHANGE-MODAL',
  payload: boolean
}

type ChangeLoading = {
  type: 'CHANGE-LOADING',
  payload: boolean
}

type ChangeRefresh = {
  type: 'CHANGE-REFRESH',
  payload: boolean
}

type Search = {
  type: 'SEARCH',
  payload: string
}

export type ModalAction = ChangeModal
export type LoadingAction = ChangeLoading | ChangeRefresh
export type SearchAction = Search

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
