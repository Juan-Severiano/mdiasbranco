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

export enum Sector {
  SECTOR = 'Setor',
  FINANCIAL = 'Financeiro',
  HUMAN_RESOURCES = 'Recursos Humanos',
  INFORMATION_TECHNOLOGY = 'Tecnologia da Informação (TI)',
  ADVERTISING_MARKETING = 'Marketing e Publicidade',
  OPERATIONS = 'Operações',
  SALES = 'Vendas',
  LEGAL_COMPLIANCE = 'Jurídico e Compliance',
  ADMINISTRATION = 'Administração',
  SEARCH_DEVELOPMENT = 'Pesquisa e Desenvolvimento (P&D)',
  PROJECT_MANAGEMENT = 'Gestão de Projetos',
  INVESTOR_RELATIONSHIP = 'Relações com Investidores',
  HEALTH_WORK_SAFETY = 'Saúde e Segurança no Trabalho',
  SUSTAINABILITY_RSC = 'Sustentabilidade e Responsabilidade Social Corporativa (RSC)',
  CONTINUITY_CRISIS_MANAGEMENT = 'Gestão de Crises e Continuidade dos Negócios',
  DEVELOPMENT_STRATEGY = 'Estratégia e Desenvolvimento de Negócios'
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
