import { Box, Container } from "@mui/material"
import { Logo } from "../../components/core/logo";
import { Outlet } from "react-router-dom";

const SimpleLayoutLight = () => {
  return (
    <>
      <Container maxWidth='md' sx={{
        zIndex: 2,
        position: 'absolute',
        p: 2,
        minWidth: '100vw',
        height: '100vh'
      }}>
        <Logo theme="dark" width={150} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth='sm' sx={{ my: 4 }}>
            <Box sx={{ mx: 5 }}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Container>
      <Box sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: "#E5F9FF"
      }}>
        <Box component='footer' sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100vw',
        }}>
          <img src="/borda-branca.svg" style={{ marginBottom: -10 }} />
          <Box sx={{ backgroundColor: '#fff', height: 100 }} />
        </Box>
      </Box>
    </>
  );
}

export default SimpleLayoutLight
