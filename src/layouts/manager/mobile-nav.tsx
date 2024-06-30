import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/core/logo';
import { navItems } from './config';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button } from '@mui/material';
import { IconLogin } from '@tabler/icons-react';
import { NavItemConfig } from '../../types/nav';
import { Assignment, RocketLaunch } from '@mui/icons-material';
import { Bookmark, House } from '@phosphor-icons/react';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    onClose!()
  }, [navigate]);

  return (
    <Drawer
    PaperProps={{
      sx: {
        '--MobileNav-background': 'var(--mui-palette-primary-main)',
        '--MobileNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--MobileNav-background)',
        color: 'var(--MobileNav-color)',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        scrollbarWidth: 'none',
        width: 200,
        zIndex: 'var(--MobileNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
        borderRadius: '0px 24px 24px 0px',
      },
    }}
    onClose={onClose}
    open={open}
    >
      <Stack sx={{ py: 3, px: .2 }} alignItems='center' justifyContent='center'>
        <Logo width={150} />
      </Stack>
      <Box component="nav" sx={{ flex: '1 1 auto', mt: 9 }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>
      <Box>
        <Button
          sx={{
            mt: 'auto', mb: 3, mx: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            display: 'flex',
            padding: '5px 16px',
            textDecoration: 'none',
            color: '#fff',
          }}
          startIcon={<IconLogin  />}
          onClick={handleSignOut}
        >
          Recolher
        </Button>
      </Box>
    </Drawer>
  );
}

function renderNavItems({ items = [], pathname }: { items?: any; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: any): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function NavItem({ href, icon, title }: NavItemConfig): React.JSX.Element {
  return (
    <li className='nav-link'>
      <NavLink
        to={href!}
        className={({ isActive }) => isActive ? 'nav-icon' : ''}
        style={{
          alignItems: 'center',
          justifyContent: 'start',
          cursor: 'pointer',
          display: 'flex',
          padding: '5px 16px',
          textDecoration: 'none',
          color: '#f0f0f0',
        }}
      >
        {icon === 'clipboard' && <Assignment sx={{ mr: 2 }} />}
        {icon === 'home' && <House size={22} weight="fill" style={{ marginRight: 20 }} />}
        {icon === 'user' && <RocketLaunch sx={{ mr: 2 }} />}
        {icon === 'historic' && <RestoreIcon sx={{ mr: 2 }} />}
        {icon === 'bookmark' && <Bookmark size={22} weight="fill" />}
        {title}
      </NavLink>
    </li>
  );
}
