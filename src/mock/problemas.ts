import dayjs from "dayjs";
import { Problem } from "../types/problem";

export const problems = [
  {
    id: 1,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['automatizacao'],
    resolve_at: String(dayjs().add(10, 'days').toDate()),
    responsible_startup: {
      cnpj: '098754321123',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: 'Automatização',
      service: 'Automatização',
      website: 'https://empresa.com',
      id: 1
    },
    setor: 'Tecnologia',
    status: 'concluted',
    title: 'Automatizar a ação de embalar pacotes'
  },
  {
    id: 2,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['logistica'],
    resolve_at: String(dayjs().add(15, 'days').toDate()),
    responsible_startup: {
      cnpj: '12345678901234',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: 'Logística',
      service: 'Logística',
      website: 'https://empresa.com',
      id: 2
    },
    setor: 'Industria',
    status: 'analisys',
    title: 'Otimizar o roteamento de entregas'
  },
  {
    id: 3,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['saude'],
    resolve_at: String(dayjs().add(12, 'days').toDate()),
    responsible_startup: {
      cnpj: '09876543210987',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: '',
      service: 'Saúde',
      website: 'https://empresa.com',
      id: 3
    },
    setor: 'Tecnologia',
    status: 'pending',
    title: 'Desenvolver um sistema de gestão hospitalar'
  },
  {
    id: 4,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['educacao'],
    resolve_at: String(dayjs().add(20, 'days').toDate()),
    responsible_startup: {
      cnpj: '87654321098765',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: '',
      service: 'Educação',
      website: 'https://empresa.com',
      id: 4
    },
    setor: 'Vendas',
    status: 'concluted',
    title: 'Desenvolver uma plataforma de ensino online'
  },
  {
    id: 5,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['sustentabilidade'],
    resolve_at: String(dayjs().add(18, 'days').toDate()),
    responsible_startup: {
      cnpj: '13579246802468',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: '',
      service: 'Sustentabilidade',
      website: 'https://empresa.com',
      id: 5
    },
    setor: 'Industria',
    status: 'analisys',
    title: 'Desenvolver alternativas sustentáveis de embalagens'
  },
  {
    id: 6,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['e-commerce'],
    resolve_at: String(dayjs().add(17, 'days').toDate()),
    responsible_startup: {
      cnpj: '24680135792468',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: '',
      service: 'E-commerce',
      website: 'https://empresa.com',
      id: 6
    },
    setor: 'Industria',
    status: 'pending',
    title: 'Implementar uma estratégia de cross-selling'
  },
  {
    id: 7,
    description: 'Lorem ipsum ametd, ido aotp, ipsum ametd, ido aotp,ipsum ametd, ido aotp,ipsum ametd, ido aotp,',
    description_solution: 'Descrição do problema pelo gestor',
    feedback: 'Feedback do problema pelo gestor',
    keywords: ['tecnologia'],
    resolve_at: String(dayjs().add(14, 'days').toDate()),
    responsible_startup: {
      cnpj: '98765432101234',
      corporate_reason: 'Lorem ipsum',
      email: 'contato@empresa.com',
      linkedin: 'https://linkedin.com/empresa-linkedin',
      sector: '',
      service: 'Tecnologia',
      website: 'https://empresa.com',
      id: 7
    },
    setor: 'Tecnologia',
    status: 'open',
    title: 'Desenvolver um aplicativo de gestão financeira'
  },
] satisfies Problem[]