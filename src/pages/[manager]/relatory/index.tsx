import { Button, Stack, Typography } from "@mui/material"
import { Download } from '@mui/icons-material'

export default function ManagerRelatory() {
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
            Relatório
          </Typography>
        </Stack>
        <div>
          <a href="/Relatorio.pdf" download>
            <Button startIcon={<Download />} variant="contained">
              Baixar Relatório
            </Button>
          </a>
        </div>
      </Stack>
    </>
  )
}
