import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth='lg' sx={{ zIndex: 2, flex: 1 }}>
        <Outlet />
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          minHeight: "100vh",
          backgroundImage: "url(/login-bg.png)",
          backgroundSize: "cover",
          zIndex: 1,
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            width: "100%",
            zIndex: 3,
            textAlign: 'center'
          }}
        >
          <img src="/borda-branca.svg" style={{ width: '100%' }} />
          <Box sx={{ height: 100, bgcolor: '#fff', mt: -2 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default SimpleLayout;
