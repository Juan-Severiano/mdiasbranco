export interface LoginParams {
  email: string
  password: string
}

export type Role = 'usuario' | 'gerente'
type Sector = 'tecnologia' | 'rh' | 'vendas' | 'diretoria'

export interface RegisterUser {
  name: string
  email: string
  mat: string
  password: string
  telphone: string
  sector: Sector
}

export interface User extends RegisterUser {
  id: number
}
