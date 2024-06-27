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
import { useCustomContext } from '../../contexts/context';
import { localClient } from '../../lib/local/client';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UnloggedPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
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
      <Box sx={{ p: '16px 20px' }} >
        <Typography variant="h6" fontSize={'13px'} color={'#0B2B70'}>Conta</Typography>
        <Typography variant="subtitle1" color='#0B2B70' fontWeight={700}>{user?.name}</Typography>
        <Typography variant="body1" fontSize={'10px'} color={'#0B2B70'}>{user?.email}</Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleSignIn}>
          <ListItemIcon color='primary'>
            <Login color="error" />
          </ListItemIcon>
          <Typography variant='body1' color='primary' fontWeight={600}>
            Sair
          </Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
