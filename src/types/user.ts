export interface LoginParams {
  email: string
  password: string
}

type Role = 'usuario' | 'gerente' | 'tecnico'
type Sector = 'tecnologia' | 'rh' | 'vendas' | 'diretoria'

export interface RegisterUser {
  name: string
  email: string
  mat: string
  password: string
  telphone: string
  role: Role
  sector: Sector
}

export interface User extends RegisterUser {
  id: number
}
