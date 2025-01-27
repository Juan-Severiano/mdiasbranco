import { localClient } from "../../lib/local/client";
import { UserState } from "../../types/reducers/auth-reducer";
import { ActionType } from "../config";

export const authInitialState: UserState = {
  user: null
}

export const userReducer = (state: UserState, action: ActionType): UserState => {
  switch (action.type) {
    case 'SIGN_IN':
      localStorage.setItem('token', action.payload.access!)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return action.payload
    case 'SIGN_OUT':
      localStorage.setItem('token', '')
      localClient.removeUser()
      return authInitialState
    default:
      return state
  }
}
