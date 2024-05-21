import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, IconButton, Stack } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { SideNav } from "./side-nav";
import { MobileNav } from "./mobile-nav";
import TopNav from "./top-nav";
import StepForm from "../../components/form/modal-step";
import ModalProblem from "../../components/modal";

const ManagerLayout = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#f7f7fd"
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            pl: { lg: "75px" },
            minHeight: "100vh",
            pb: 10
          }}
        >
          <Box
            component="header"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: "appBar"
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              minHeight="64px"
              px={2}
            >
              <IconButton
                onClick={() => setOpenNav(!openNav)}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <TopNav />
            </Stack>
          </Box>
          <Container>
            <Outlet />
            <StepForm />
            <ModalProblem />
          </Container>
        </Box>
      </Box>
      <MobileNav
        open={openNav}
        onClose={() => setOpenNav(false)}
      />
    </>
  );
};

export default ManagerLayout;
