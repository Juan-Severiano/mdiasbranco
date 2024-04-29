import { Grid, IconButton, Stack, Tooltip, Box, Button } from "@mui/material";
import { Logo } from "../../components/core/logo";
import { AccountCircle } from "@mui/icons-material";
import { usePopover } from "../../hooks/use-popover";
import { NavLink } from "react-router-dom";
import { useCustomContext } from "../../contexts/context";
import { UnloggedPopover } from "./unlogged-popover";
import { localClient } from "../../lib/local/client";

export default function TopNav() {
  const userPopover = usePopover<HTMLDivElement>();
  const { data: user } = localClient.getUser();
  const { dispatch } = useCustomContext()
  return (
    <>
      <Grid container>
        <Grid item xs={5} md={3} lg={3}>
          {
            user?.role === 'usuario' && <Box component={NavLink} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pt: 2 }} to="/">
              <Logo width={150} />
            </Box>
          }
        </Grid>
        <Grid item xs={6} md={9} justifyItems='end'>
          <Stack alignItems='center' justifyContent='end' direction="row" spacing={2}>
            <Tooltip title="Novo Chamado">
              <Box>
                <Button variant="contained" color="secondary" onClick={() => {
                  dispatch({ type: 'CHANGE-MODAL', payload: true })
                }} sx={{ my: 1, color: '#000' }}>
                  Solicitar Chamado
                </Button>
              </Box>
            </Tooltip>
            <Tooltip
              title="Conta"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
            >
              <IconButton>
                <AccountCircle color="secondary" fontSize={"large"} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid >
      <UnloggedPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
    </>
  )
}
