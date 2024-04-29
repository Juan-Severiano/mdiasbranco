import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component='footer'
      bgcolor='#000'
      sx={{
        minHeight: 100,
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        component='footer'
        bgcolor='#9a221a'
        sx={{
          height: 100,
          color: '#fff',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Typography variant="subtitle1">&copy; 2024 - WheelWonder S.A - Todos os direitos reservados</Typography>
      </Box>
    </Box>
  )
}
