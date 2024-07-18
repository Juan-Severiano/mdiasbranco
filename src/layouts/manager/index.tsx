import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Container, IconButton, Stack } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { SideNav } from "./side-nav";
import { MobileNav } from "./mobile-nav";
import TopNav from "./top-nav";
import StepForm from "../../components/form/modal-step";
import ModalProblem from "../../components/modal";
import { localClient } from "../../lib/local/client";
import { getUserById } from "../../services/requests/auth";

const ManagerLayout = () => {
  const [openNav, setOpenNav] = useState(false);
  const { data: user } = localClient.getUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if (!user) {
      navigate('/auth/login')
    }
  }, [])

  async function getUser() {
    if (user) {
      const newUser = await getUserById(String(user?.id!))
      if (newUser) {
        localClient.addUser(newUser)
      }
    }
  }

  useEffect(() => {
    getUser()
    if (user?.role === 'manager') {
      return
    } else if (user?.role === 'base') {
      navigate('/')
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: "#f7f7fd"
        }}
      >
        <SideNav setOpen={setOpenNav} />
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
              zIndex: "appBar",
              bgcolor: '#F7F7FDd0',
              backdropFilter: 'blur(5px)',
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
              <Container>
                <TopNav />
              </Container>
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
