import { IconOwnProps } from "@mui/material"

export const status = {
  'Pendente': 'warning',
  'Aberto': 'primary',
  'Aprovado': 'success',
  'Análise': 'action',
  'Finalizado': 'info',
} as {
  [x: string]: IconOwnProps['color']
}

export enum Status {
  pending = 'Pendente',
  received = 'Aberto',
  approved = 'Aprovado',
  analysis = 'Análise',
  finished = 'Finalizado'
}
