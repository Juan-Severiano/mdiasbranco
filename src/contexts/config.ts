import { UserAction } from "../types/reducers/auth-reducer"
import { LoadingAction, ModalAction, ModalDetailsAction, SearchAction } from "../types/reducers/modal-reducer"
import { ThemeAction } from "../types/reducers/theme-reducer"
import { authInitialState, userReducer } from "./reducers/auth-reducer"
import { loadingInitialState, loadingReducer } from "./reducers/loading-reducer"
import { modalDetailsInitialState, modalDetailsReducer } from "./reducers/modal-details"
import { modalInitialState, modalReducer } from "./reducers/modal-reducer"
import { searchInitialState, searchReducer } from "./reducers/search-reducer"
import { themeInitialState, themeReducer } from "./reducers/theme-reducer"

export const InitialState = {
  theme: themeInitialState,
  auth: authInitialState,
  loading: loadingInitialState,
  search: searchInitialState,
  modal: modalInitialState,
  modalDetails: modalDetailsInitialState,
}

export const Reducers = (state: InitialStateType, action: ActionType) => ({
  modal: modalReducer(state.modal, action),
  modalDetails: modalDetailsReducer(state.modalDetails, action),
  theme: themeReducer(state.theme, action),
  auth: userReducer(state.auth, action),
  loading: loadingReducer(state.loading, action),
  search: searchReducer(state.search, action),
}
)

export type InitialStateType = typeof InitialState
export type ActionType = ThemeAction | UserAction | ModalAction | ModalDetailsAction | LoadingAction | SearchAction
