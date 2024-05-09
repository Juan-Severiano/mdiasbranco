import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelection } from '../../hooks/use-selection';
// ICONS
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';

import {CardContent, Paper } from '@mui/material'; 

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
}

export function CustomersTable({
  rows = [],
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);
  const { dispatch } = useCustomContext()
  const { selected } = useSelection(rowIds);
  return (
    <Card>
  <Box sx={{ overflowX: 'auto' }}>
    <Stack spacing={2} direction="row"> {/* Stack para arranjo horizontal */}
      {rows.map((row) => {
        const isSelected = selected?.has(row.id); // Verifica se o item está selecionado
        return (
          <Paper key={row.id} elevation={3} style={{ padding: '10px', cursor: 'pointer', backgroundColor: isSelected ? '#f0f0f0' : 'inherit' }}>
            <CardContent onClick={() => {
              console.log('sd');
              dispatch({ type: 'CHANGE-MODAL-DETAILS', payload: true });
            }}>
              <Stack sx={{ marginLeft: 5 }} direction="column">
                <Typography variant="h6">
                  {row.title} juan
                </Typography>
                <Typography variant="body1">
                  {row.user?.name} juan
                </Typography>
              </Stack>
              <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                <Stack spacing={1} direction='row'>
                  <Brightness1Icon
                    color={
                      row.status === 'open' ? 'info'
                      : row.status === 'analisys' ? 'warning'
                      : row.status === 'pending' ? 'disabled'
                      : 'success'
                    }
                  />
                  <Typography variant='body1' color='action' textTransform='capitalize'>{row.status}</Typography> {/* Status */}
                </Stack>
                <Stack spacing={1} direction='row'>
                  <CalendarMonthIcon color='action' />
                  <Typography variant='body1' color='action' textTransform='capitalize'>{dayjs(row.resolve_at).format('DD/MM/YYYY')}</Typography> {/* Data de resolução */}
                </Stack>
              </Stack>
              <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={1} direction='row'>
                  <WarningAmberIcon color='action' />
                  <Typography variant='body1' color='action' textTransform='capitalize'>{row.keywords![0]}</Typography> {/* Palavras-chave */}
                </Stack>
                <Stack spacing={1} direction='row'>
                  <SettingsIcon color='action' />
                  <Typography variant='body1' color='action' textTransform='uppercase'>{row.setor}</Typography> {/* Setor */}
                </Stack>
              </Stack>
            </CardContent>
          </Paper>
        );
      })}
    </Stack>
  </Box>
</Card>
  );
}
