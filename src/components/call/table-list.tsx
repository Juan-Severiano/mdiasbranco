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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import IconButton from '@mui/material/IconButton';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

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
  const { dispatch } = useCustomContext();
  const { selected } = useSelection(rowIds);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              return (
                <TableRow
                  hover
                  key={row.id}
                  selected={isSelected}
                >
                  <TableCell>
                    <Stack sx={{ marginLeft: 5 }} flexDirection="column">
                      <Typography
                        variant="subtitle2"
                        sx={{ 
                          fontSize: '0.875rem', 
                          ":hover": { 
                            textDecoration: 'underline', 
                            cursor: 'pointer' 
                          } 
                        }}
                        role="button"
                        onClick={() => {
                          dispatch({
                            type: 'CHANGE-MODAL-DETAILS',
                            payload: { problem: row }
                          });
                        }}
                      >
                        {row.title}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '0.75rem' }}>
                        {row.user?.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      justifyContent="center"
                    >
                      <Stack spacing={1} flexDirection="row" alignItems="center">
                        <Brightness1Icon
                          color={
                            row.status === 'open'
                              ? 'info'
                              : row.status === 'analisys'
                                ? 'warning'
                                : row.status === 'pending'
                                  ? 'disabled'
                                  : 'success'
                          }
                          sx={{ fontSize: '1rem' }}
                        />
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          sx={{ fontSize: '0.75rem' }}
                          textTransform="capitalize"
                        >
                          {row.status}
                        </Typography>
                      </Stack>
                      <Stack spacing={1} flexDirection="row" alignItems="center">
                        <CalendarMonthIcon color="action" sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2" color="textPrimary" sx={{ fontSize: '0.75rem' }}>
                          {dayjs(row.resolve_at).format('DD/MM/YYYY')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell >
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <WarningAmberIcon color="action" sx={{ fontSize: '1rem' }} />
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        sx={{ fontSize: '0.75rem' }}
                        textTransform="capitalize"
                      >
                        {row.keywords![0]}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <SettingsIcon color="action" sx={{ fontSize: '1rem' }} />
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{ fontSize: '0.75rem' }}
                        textTransform="capitalize"
                      >
                        {row.setor}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <Typography variant="subtitle2" color="textPrimary" sx={{ fontSize: '0.75rem' }} textTransform="capitalize">
                        Lorem
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" justifyContent="flex-end">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
