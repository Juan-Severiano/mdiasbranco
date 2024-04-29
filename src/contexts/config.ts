import { UserAction } from "../types/reducers/auth-reducer"
import { ModalAction, ModalDetailsAction } from "../types/reducers/modal-reducer"
import { ThemeAction } from "../types/reducers/theme-reducer"
import { authInitialState, userReducer } from "./reducers/auth-reducer"
import { modalDetailsInitialState, modalDetailsReducer } from "./reducers/modal-details"
import { modalInitialState, modalReducer } from "./reducers/modal-reducer"
import { themeInitialState, themeReducer } from "./reducers/theme-reducer"

export const InitialState = {
  theme: themeInitialState,
  auth: authInitialState,
  modal: modalInitialState,
  modalDetails: modalDetailsInitialState,
}

export const Reducers = (state: InitialStateType, action: ActionType) => ({
  modal: modalReducer(state.modal, action),
  modalDetails: modalDetailsReducer(state.modalDetails, action),
  theme: themeReducer(state.theme, action),
  auth: userReducer(state.auth, action),
}
)

export type InitialStateType = typeof InitialState
export type ActionType = ThemeAction | UserAction | ModalAction | ModalDetailsAction
