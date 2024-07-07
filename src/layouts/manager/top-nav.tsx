import { Avatar, Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
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
  // const toggleTheme = () => {
  //   const newTheme = state.theme.theme === 'dark' ? 'light': 'dark'
  //   dispatch({ type: 'CHANGE_THEME', payload: newTheme })
  // }

  const userPopover = usePopover<HTMLDivElement>();
  return (
    <>
      <Grid container sx={{
        py: 2
      }} alignItems='center'>
        <Grid item xs={6} md={7.5}>
          <SearchBar />
        </Grid>
        <Grid item xs={0} md={1.5}></Grid>
        <Grid item xs={6} md={3} justifyItems='end'>
          <Stack alignItems='center' justifyContent='end' direction="row" spacing={1}>
            <Sync />
            {/* <Tooltip
              title="Notificações"
            >
              <IconButton>
                <Badge color="primary" variant="dot">
                  <Bell weight="fill" size={18} />
                </Badge>
              </IconButton>
            </Tooltip> */}
            <Tooltip
              title="Conta"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
            >
              <Button>
                <Stack justifyContent="center">
                  <Typography align="right" variant="subtitle1" color='#323232' fontSize={12} fontWeight={700}>{user?.name}</Typography>
                  <Typography align="right" variant="body2" color='#323232' fontSize={9}>{user?.role === 'manager' ? 'Gerente' : 'Colaborador'}</Typography>
                </Stack>
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
