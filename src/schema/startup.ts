import * as Yup from 'yup';
import { Sector } from '../types/problem';

// Definindo o esquema de validação
export const startupSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  corporate_reason: Yup.string().required('Razão Social é obrigatório'),
  cnpj: Yup.string().required('CNPJ é obrigatório'),
  website: Yup.string().optional(),
  linkedin: Yup.string().optional(),
  email: Yup.string().required('Email é obrigatório'),
  service: Yup.string().required('Serviço é obrigatório'),
  sector: Yup.string().required('Setor é obrigatório'),
  instagram: Yup.string().required('Instagram é obrigatório'),
  localization: Yup.string().required('Endereço é obrigatório'),
  size: Yup.string().required('Tamanho é obrigatório'),
  attachment: Yup.array()
    .of(
      Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
        if (value) {
          return (value as File).size <= 1024 * 1024;
        }
        return true;
      })
    )
    .max(2, 'Você pode enviar no máximo 2 arquivos')
});

export const startupEditSchema = Yup.object().shape({
  name: Yup.string().optional(),
  corporate_reason: Yup.string().optional(),
  cnpj: Yup.string().optional(),
  website: Yup.string().optional(),
  linkedin: Yup.string().optional(),
  email: Yup.string().optional(),
  service: Yup.string().optional(),
  sector: Yup.string().optional(),
  size: Yup.string().optional(),
  localization: Yup.string().optional(),
  instagram: Yup.string().optional(),
  attachment: Yup.array()
    .of(
      Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
        if (value) {
          return (value as File).size <= 1024 * 1024;
        }
        return true;
      })
    )
    .max(2, 'Você pode enviar no máximo 2 arquivos').optional()
});

type StartupValues = {
  name: string;
  corporate_reason: string;
  cnpj: string;
  website?: string;
  linkedin?: string;
  email: string;
  service: string;
  sector: string;
  size: string;
  localization: string;
  instagram: string;
  attachment: File[];
};

export interface StartupSchemaObject {
  [x: string]: any;
  name: keyof StartupValues;
  label: string;
  type?: string;
  options?: any;
}

function createStartupSchemaObject<T extends keyof StartupValues>(
  fields: Array<{ name: T; label: string; options?: any; type?: string }>
): StartupSchemaObject[] {
  return fields.map(field => ({
    name: field.name,
    label: field.label,
    type: field.type,
    options: field.options
  }));
}

export const startupSchemaObject = createStartupSchemaObject([
  { name: 'name', label: 'Nome da Startup' },
  { name: 'corporate_reason', label: 'Razão Social' },
  { name: 'cnpj', label: 'CNPJ' },
  { name: 'website', label: 'Website' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'email', label: 'Email' },
  { name: 'instagram', label: 'Instagram' },
  { name: 'service', label: 'Serviço' },
  { name: 'sector', label: 'Setor', options: Sector },
  { name: 'size', label: 'Quantidade de funcionários', type: 'number' },
  { name: 'localization', label: 'Endereço' },
  { name: 'attachment', label: 'Anexos' },
]);
