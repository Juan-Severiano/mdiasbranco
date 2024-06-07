import { Grid, IconButton, Stack, Tooltip, Box, Button } from "@mui/material";
import { Logo } from "../../components/core/logo";
import { AccountCircle } from "@mui/icons-material";
import { usePopover } from "../../hooks/use-popover";
import { NavLink } from "react-router-dom";
import { useCustomContext } from "../../contexts/context";

export default function TopNav() {
  const userPopover = usePopover<HTMLDivElement>();
  const { dispatch } = useCustomContext()
  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={5} md={3} lg={3}>
          <Box component={NavLink} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pt: 2 }} to="/">
            <Logo width={150} />
          </Box>
        </Grid>
        <Grid item xs={3} md={9} alignItems='center'>
          <Stack sx={{ alignItems: 'center', justifyContent: 'end' }} direction="row" spacing={2}>
            <Tooltip title="Novo Chamado">
              <Box>
                <Button variant="contained" color="secondary" sx={{ color: '#000' }} onClick={() => {
                  dispatch({ type: 'CHANGE-MODAL', payload: true })
                }}>
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
                <AccountCircle sx={{ color: '#fff' }} fontSize={"large"} />
              </IconButton>
            </Tooltip>   
          </Stack>
        </Grid>
      </Grid >
    </>
  )
}
