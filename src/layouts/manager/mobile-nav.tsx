'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../../components/core/logo';
import { navItems } from './config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import RestoreIcon from '@mui/icons-material/Restore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { localClient } from '../../lib/local/client';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const { pathname } = useLocation();
  const { data: user } = localClient.getUser()

  return (
    <Drawer
      PaperProps={{
        sx: {
          '--MobileNav-background': 'var(--mui-palette-background-paper)',
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
          width: 'var(--MobileNav-width)',
          zIndex: 'var(--MobileNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={Link} to='/' sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            p: '15px 14px',
            justifyContent: 'center',
            backgroundImage: 'url(/bg/bg-account.gif)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: '#F3F5F8',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              p: '15px 14px',
            }}
          >
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography color="primary" variant="body2">
                Olá, {user?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems })}
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
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function NavItem({ href, title, icon }: any): React.JSX.Element {

  return (
    <li>
      <NavLink
        to={href!}
        className={({ isActive }) => isActive ? 'active-link' : ''}
        style={{
          alignItems: 'center',
          borderRadius: 16,
          cursor: 'pointer',
          display: 'flex',
          gap: 1,
          padding: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          color: '#667085'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon === 'dashboard' && <SignalCellularAltIcon sx={{ marginRight: 1 }} />}
          {icon === 'home' && <HomeIcon sx={{ marginRight: 1 }} />}
          {icon === 'user' && <ExploreIcon sx={{ marginRight: 1 }} />}
          {icon === 'users' && <AccountCircleIcon sx={{ marginRight: 1 }} />}
          {icon === 'tecnics' && <AccountCircleIcon sx={{ marginRight: 1 }} />}
          {icon === 'historic' && <RestoreIcon sx={{ marginRight: 1 }} />}
          {icon === 'relatorio' && <AssignmentIcon sx={{ marginRight: 1 }} />}
          <Typography
            component="span"
            sx={{
              color: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: '28px',
            }}
          >
            {title}
          </Typography>
        </Box>
      </NavLink>
    </li>
  );
}
