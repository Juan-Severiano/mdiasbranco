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
  
import {Table, TableBody, TableCell, TableRow } from '@mui/material';

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
        <Table sx={{ minWidth: '800px' }}>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              return (
                <TableRow hover key={row.id} selected={isSelected} onClick={() => {
                  console.log('sd')
                  dispatch({ type: 'CHANGE-MODAL-DETAILS', payload: true })
                }}>
                  <TableCell>
                    <Stack sx={{ marginLeft: 5 }} flexDirection="column">
                      <Typography variant="h6">
                        {row.title}
                      </Typography>
                      <Typography variant="body1">
                        {/* Nome Do solicitante */}
                        {row.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                      <Stack spacing={1} flexDirection='row'>
                        <Brightness1Icon
                          color={
                            row.status === 'open' ? 'info'
                              : row.status === 'analisys' ? 'warning'
                                : row.status === 'pending' ? 'disabled'
                                  : 'success'
                          }
                        />
                        <Typography variant='body1' color='action' textTransform='capitalize'>{row.status}</Typography>
                      </Stack>
                      <Stack spacing={1} flexDirection='row'><CalendarMonthIcon color='action' />{dayjs(row.resolve_at).format('DD/MM/YYYY')}</Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={1} flexDirection='row'><WarningAmberIcon color='action' /> <Typography variant='body1' color='action' textTransform='capitalize'> {row.keywords![0]}</Typography></Stack>
                    <Stack spacing={1} flexDirection='row'><SettingsIcon color='action' /><Typography variant='body1' color='action' textTransform='uppercase'> {row.setor}</Typography></Stack>
                  </TableCell>
                  {/*  */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
