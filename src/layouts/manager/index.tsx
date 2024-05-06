import { Outlet } from "react-router-dom"
import { SideNav } from "./side-nav";
import { Box, Container, GlobalStyles, IconButton, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import MenuIcon from '@mui/icons-material/Menu';
import StepForm from "../../components/form/modal-step";
import TopNav from "./top-nav";

const ManagerLayout = () => {
  const [openNav, setOpenNav] = useState(false)

  // const navigate = useNavigate()
  // const { data: user } = localClient.getUser()
  // useEffect(() => {
  //   if (user?.role !== 'gerente') {
  //     navigate('/')
  //   }
  // }, [])

  const theme = useTheme()

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
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
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <Box
            component="header"
            sx={{
              borderBottom: '1px solid var(--mui-palette-divider)',
              backgroundColor: theme.palette.primary.main,
              position: 'sticky',
              top: 0,
              zIndex: 'var(--mui-zIndex-appBar)',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
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
          <Container maxWidth="xl" sx={{ py: '64px', bgcolor: '#F3F5F8', minHeight: '100vh' }}>
            <Outlet />
          <StepForm />
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
