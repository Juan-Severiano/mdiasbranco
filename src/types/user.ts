import { Sector } from "./problem"

export interface LoginParams {
  email: string
  password: string
}

export type Role = 'usuario' | 'gerente'

export interface RegisterUser {
  name: string
  email: string
  mat: string
  password: string
  telphone: string
  sector: Sector
}

export interface User extends RegisterUser {
  role: string
  id: number
}
