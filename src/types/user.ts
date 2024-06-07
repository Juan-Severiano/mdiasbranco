import { Sector } from "./problem"

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterUser {
  name: string
  email: string
  mat: string
  password: string
  telphone: string
  sector: Sector
}

export interface User extends RegisterUser {
  role: 'manager' | 'base'
  id: number
}
