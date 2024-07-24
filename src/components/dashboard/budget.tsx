import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import RocketLaunch from '@mui/icons-material/RocketLaunchOutlined';

export interface BudgetProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string | number;
}

export function Budget({ diff, trend, sx, value }: BudgetProps): React.JSX.Element {
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" fontSize={12} variant="inherit">
                Quantidade
              </Typography>
              <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={1}>
                <Typography variant="h3" color="primary" fontWeight={600}>
                  {value ?? 11}
                </Typography>
                <Typography variant="inherit"  fontSize={12} color="primary">
                  Startups Cadastradas
                </Typography>
              </Stack>
            </Stack>
            <Avatar sx={{ backgroundColor: '#fff', height: '56px', width: '56px' }}>
              <RocketLaunch color='primary' fontSize='large' />
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Desde o último mês
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
