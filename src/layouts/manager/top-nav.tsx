import { Avatar, Button, Grid, Hidden, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { usePopover } from "../../hooks/use-popover";
import { UnloggedPopover } from "./unlogged-popover";
import { localClient } from "../../lib/local/client";
import { baseURL } from "../../config";
import { Sync } from "../../components/core/sync";
import { SearchBar } from "../../components/core/search-bar";

export default function TopNav() {
  // const { toggleTheme, mode } = useTheme();
  // const { state } = useCustomContext()
  const { data: user } = localClient.getUser()
  console.log("user aqui caecete", user)
  // const toggleTheme = () => {
  //   const newTheme = state.theme.theme === 'dark' ? 'light': 'dark'
  //   dispatch({ type: 'CHANGE_THEME', payload: newTheme })
  // }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const userPopover = usePopover<HTMLDivElement>();
  return (
    <>
      <Grid container sx={{
        py: 2
      }} alignItems='center'>
        <Grid item xs={8} md={7.5}>
          <SearchBar />
        </Grid>
        <Grid item xs={.5} md={1.5}></Grid>
        <Grid item xs={3.5} md={3} justifyItems='end'>
          <Stack alignItems='center' justifyContent='end' direction="row" spacing={1}>
            <Sync />
            <Tooltip
              title="Conta"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
            >
              <Button>
                <Hidden smDown>
                  <Stack justifyContent={isMobile ? 'end' : 'center'}>
                    <Typography
                      align="right"
                      variant="subtitle1"
                      color='#323232'
                      fontSize={12}
                      fontWeight={700}>
                      {user?.name}
                    </Typography>
                    <Typography align="right" variant="body2" color='#323232' fontSize={9}>{(user?.role === 'manager' ? 'Gerente' : 'Colaborador')}</Typography>
                  </Stack>
                </Hidden>
                <Avatar sx={{ ml: 2, maxWidth: 50 }} src={`${baseURL}/user/attachment/${user?.image_id?.path}`} />
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
      <UnloggedPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
    </>
  )
}
