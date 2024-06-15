import { IconOwnProps } from "@mui/material"

export const status = {
  'Pendente': 'warning',
  'Rebebido': 'primary',
  'Aproavado': 'success',
  'Análise': 'action',
  'Finalizado': 'info',
} as {
  [x: string]: IconOwnProps['color']
}
