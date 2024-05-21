import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const SimpleLogin = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          zIndex: 2,
          position: "absolute",
          minWidth: "100vw",
          height: "100vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm" sx={{ my: 'auto' }}>
          <Box sx={{ mx: 5 }}>
            <Outlet />
          </Box>
        </Container>
      </Container>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/login-bg.png)",
          backgroundSize: "cover",
          zIndex: 1,
          "&::after": {
            content: '""',
            position: "fixed",
            top: 0,
            left: 0,
            minHeight: "100vh",
            minWidth: "100vw",
            backgroundColor: "#0B2B70e0",
            zIndex: 2,
          },
        }}
      >
        <Box
          component="footer"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100vw",
            zIndex: 3,
          }}
        >
          <img src="/borda-branca.svg" style={{ marginBottom: -10, width: '100%' }} />
          <Box sx={{ backgroundColor: "#fff", height: 100 }} />
        </Box>
      </Box>
    </>
  );
};

export default SimpleLogin;
