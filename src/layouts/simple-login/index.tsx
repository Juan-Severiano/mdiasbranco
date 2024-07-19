import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const SimpleLogin = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url(/login-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: "#0B2B70e0",
          zIndex: 2,
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm" sx={{ my: 'auto' }}>
          <Box sx={{ mx: { md: 5 } }}>
            <Outlet />
          </Box>
        </Container>
      </Container>
      <Box
        component="footer"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 4,
        }}
      >
        <img src="/borda-branca.svg" style={{ width: '100%' }} alt="Footer Decoration" />
        <Box sx={{ backgroundColor: "#fff", height: 100, mt: -2 }} />
      </Box>
    </Box>
  );
};

export default SimpleLogin;
