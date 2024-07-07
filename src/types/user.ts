import { Attachment, Sector } from "./problem"

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
  files: File[]
}

export interface User extends RegisterUser {
  role: 'manager' | 'base'
  id: number
  image_id: Attachment
}
