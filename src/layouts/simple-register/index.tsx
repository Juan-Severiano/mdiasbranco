import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom";

const SimpleRegister = () => {
  return (
    <>
      <Container maxWidth='md' sx={{
        zIndex: 2,
        position: 'absolute',
        minWidth: '100vw',
        height: '100vh',
        overflowY: 'hidden',
        overflowX: 'hidden',
        overflow: 'hidden',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth='md'>
            <Box>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Container>
      <Box sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: "#0b2b70"
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

export default SimpleRegister
