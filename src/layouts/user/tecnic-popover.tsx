// POPOVER DO TECNICO

import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';

import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useCustomContext } from '../../contexts/context';
import { localClient } from '../../lib/local/client';


export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function TecnicPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const navigate = useNavigate();
  const { dispatch } = useCustomContext()
  const { data : user } = localClient.getUser()!
  const handleSignIn = React.useCallback(async (): Promise<void> => {
    dispatch({ type: 'SIGN_OUT' })
    navigate('/auth/login')
  }, [navigate]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '280px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }} >
        <Typography variant="h6" fontSize={'13px'} color={'#616161'}>Conta</Typography>
        <Typography variant="h6" fontSize={'17px'} color={'#616161'}>NOME DO CRISTÃO</Typography>
        <Typography variant="h6" fontSize={'10px'} color={'#616161'}>emaildocristao@email.com</Typography>
      </Box>
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem >
          <ListItemIcon color='text.success'>
          <FormatListBulletedSharpIcon />
          </ListItemIcon>
          <Typography variant='body1' color='text.success' fontWeight={600} >
            LISTA DE CHAMADOS
          </Typography>
        </MenuItem>
        <MenuItem >
          <ListItemIcon color='text.success'>
          <ManageHistoryIcon />
          </ListItemIcon>
          <Typography variant='body1' color='text.success' fontWeight={600}>
            HISTORICO
          </Typography>
        </MenuItem>
        <MenuItem >
          <ListItemIcon color='text.success'>
          <GroupAddSharpIcon />
          </ListItemIcon>
          <Typography variant='body1' color='text.success' fontWeight={600}>
            CRIAR USUARIO
          </Typography>
        </MenuItem>
        <MenuItem sx={{ mb:4}}  >
          <ListItemIcon color='text.success'>
          <AccountCircleSharpIcon />
          </ListItemIcon>
          <Typography variant='body1' color='text.success' fontWeight={600}>
            CONTA
          </Typography>
        </MenuItem>
      </MenuList>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleSignIn}>
          <ListItemIcon color='text.success'>
            <Login color='error' />
          </ListItemIcon>
          <Typography variant='body1' color='text.success' fontWeight={600}>
            SAIR
          </Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}


// icone de chamado 
// icone de notificação