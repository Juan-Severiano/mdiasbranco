import { User } from "./user"

export interface Problem {
  id?: number
  title?: string
  description?: string
  // keywords?: string[]
  sector?: Sector
  // anexo: File | File[]
  status?: string
  description_solution?: string
  responsible_startup?: Startup
  resolve_at?: string
  feedback?: string
  user_id?: User
  attachments: Attachment[]
  created_at: string
  isBookmarked: boolean
  comments: Comments[]
}

export interface CreateProblem {
  title: string
  description: string
  sector: string
  files?: File[]
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
  name: string
  cnpj: string
  website: string
  linkedin: string
  email: string
  service: string
  sector: Sector
  attachments: Attachment
}

export interface DashData {
  countStatusCall: {
    count: {
      analysys: number
      approved: number
      finished: number
      pending: number
      received: number
    }
  }
  countUsers: {
    count: number
  }
}
