import { Avatar, Button, FormControl, Grid, OutlinedInput, Stack, Tooltip, Typography, styled } from "@mui/material";
import { usePopover } from "../../hooks/use-popover";
import { UnloggedPopover } from "./unlogged-popover";
import { Search } from "@mui/icons-material";
import { localClient } from "../../lib/local/client";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  border: 'none !important',
  outline: 'none',
  '& .MuiOutlinedInput-input::placeholder': {
    fontSize: '12px', // Defina o tamanho do placeholder aqui
    color: '#999', // Defina a cor do placeholder se necessário
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove a borda
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove a borda no hover também, se necessário
  },
  '&:focus .MuiOutlinedInput-notchedOutline': {
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}80`, // Sombra com a cor do tema principal
  },
  backgroundColor: 'white'
}));

export default function TopNav() {
  // const { toggleTheme, mode } = useTheme();
  // const { dispatch, state } = useCustomContext()
  const { data: user } = localClient.getUser()
  // const toggleTheme = () => {
  //   const newTheme = state.theme.theme === 'dark' ? 'light': 'dark'
  //   dispatch({ type: 'CHANGE_THEME', payload: newTheme })
  // }

  const userPopover = usePopover<HTMLDivElement>();
  return (
    <>
      <Grid container sx={{
        py: 2,
        backdropFilter: 'blur(5px)',
        bgcolor: '#F7F7FDd0'
      }} alignItems='center'>
        <Grid item xs={6} md={7.5}>
          <FormControl fullWidth>
            <CustomOutlinedInput
              sx={{
                height: 40
              }}
              placeholder="Pesquisar"
              startAdornment={<Search color="disabled" fontSize="small" sx={{ mr: 2 }} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={0} md={1.5}></Grid>
        <Grid item xs={6} md={3} justifyItems='end'>
          <Stack alignItems='center' justifyContent='end' direction="row" spacing={1}>
            {/* <Tooltip title="Trocar o tema">
              <IconButton onClick={toggleTheme}>
                {
                  state.theme.theme == 'light' ? <Sun fontSize={18} /> : <Moon fontSize={18} />
                }
              </IconButton>
            </Tooltip>
            <Tooltip
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
                <Avatar sx={{ mr: 2, maxWidth: 50 }} src='http://localhost:3100/user/attachment/martonio-perfil.jpg' />
                <Stack justifyContent="center">
                  <Typography align="left" variant="subtitle1" color='#323232' fontSize={12} fontWeight={700}>{user?.name}</Typography>
                  <Typography align="left" variant="body2" color='#323232' fontSize={9}>{user?.role === 'manager' ? 'Gerente' : 'Colaborador'}</Typography>
                </Stack>
              </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid >
      <UnloggedPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
    </>
  )
}
