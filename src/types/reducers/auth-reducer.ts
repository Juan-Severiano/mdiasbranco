import { User } from "../user"

export type UserState = {
  user: User | null
}

type SignInUser = {
  type: 'SIGN_IN',
  payload: { user: User, access?: string }
}

type SignOutUser = {
  type: 'SIGN_OUT'
}

export type UserAction = SignInUser | SignOutUser
