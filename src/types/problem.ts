import { User } from "./user"

export interface Problem {
  id?: number
  title?: string
  description?: string
  keywords?: string[]
  setor?: 'Vendas' | 'Industria' | 'Tecnologia'
  // anexo: File | File[]
  status?: 'pending' | 'open' | 'analisys' | 'concluted'
  description_solution?: string
  responsible_startup?: Startup
  resolve_at?: string
  feedback?: string
  user?: User
}

export interface Comments {
  id?: number
  user: User
  problem: Problem
  message: string
  attachment: Attachment
}

export interface Attachment {
  id?: number
  path: string
}

export interface Startup {
  id?: number
  corporate_reason: string
  cnpj: string
  website: string
  linkedin: string
  email: string
  service: string

  sector: string
}
