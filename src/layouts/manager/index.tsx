import { Outlet } from "react-router-dom"
import { SideNav } from "./side-nav";
import { Box, Container, GlobalStyles, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import MenuIcon from '@mui/icons-material/Menu';
import StepForm from "../../components/form/modal-step";
import TopNav from "./top-nav";
import ModalProblem from "../../components/modal";

const ManagerLayout = () => {
  const [openNav, setOpenNav] = useState(false)

  // const navigate = useNavigate()
  // const { data: user } = localClient.getUser()
  // useEffect(() => {
  //   if (user?.role !== 'gerente') {
  //     navigate('/')
  //   }
  // }, [])

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '75px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          minHeight: '100%',
          bgcolor: '#f7f7fd'
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' }, minHeight: '100vh', pb: 10 }}>
          <Box
            component="header"
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 'var(--mui-zIndex-appBar)',
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
            >
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                <IconButton
                  onClick={(): void => {
                    setOpenNav(true);
                  }}
                  sx={{ display: { lg: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
              <TopNav />
            </Stack>
          </Box>
          <Container>
            <Outlet />
            <StepForm />
            <ModalProblem />
          </Container>
        </Box>
        <MobileNav
          onClose={() => {
            setOpenNav(false);
          }}
          open={openNav}
        // items={navItems}
        />
      </Box>
    </>
  )
}

export default ManagerLayout
