import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Logo } from '../../components/core/logo';
import { navItems } from './config';
import { NavLink, useLocation } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined';
import { House } from '@phosphor-icons/react'
import RestoreIcon from '@mui/icons-material/Restore';
import { NavItemConfig } from '../../types/nav';
import { Button, useTheme } from '@mui/material';
import { IconLogin2 } from '@tabler/icons-react'
import { Assignment } from '@mui/icons-material';

export function SideNav(): React.JSX.Element {
  const { pathname } = useLocation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        '--SideNav-background': theme.palette.primary.dark,
        '--SideNav-color': theme.palette.common.white,
        '--NavItem-color': 'var(--mui-palette-neutral-950)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'none', // Removendo o background color quando ativo
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        borderRadius: '0px 24px 24px 0px',
      }}
    >
      <Stack sx={{ py: 3, px: .2 }} alignItems='center' justifyContent='center'>
        <Logo width={65} />
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
        >
          <IconLogin2  />
        </Button>
      </Box>
    </Box>
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

function NavItem({ href, icon }: NavItemConfig): React.JSX.Element {
  return (
    <li className='nav-link'>
      <NavLink
        to={href!}
        className={({ isActive }) => isActive ? 'nav-icon' : ''}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          display: 'flex',
          padding: '5px 16px',
          textDecoration: 'none',
          color: '#f0f0f0',
        }}
      >
        {icon === 'clipboard' && <Assignment />}
        {icon === 'home' && <House size={22} weight="fill" />}
        {icon === 'user' && <RocketLaunchIcon />}
        {icon === 'historic' && <RestoreIcon />}
      </NavLink>
    </li>
  );
}
