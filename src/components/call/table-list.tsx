import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useSelection } from '../../hooks/use-selection';

import IconButton from '@mui/material/IconButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
// ICONS
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';

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
        <Table sx={{ minWidth: '900px' }}>
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
                  <TableCell>
                    <Stack flexDirection='column' justifyContent="center">
                      <Stack spacing={1} flexDirection='row'>
                        <Brightness1Icon
                          color={
                            row.status === 'open' ? 'info'
                              : row.status === 'analisys' ? 'warning'
                                : row.status === 'pending' ? 'disabled'
                                  : 'success'
                          }
                        />
                        <Typography variant='body1' color='action' textTransform='capitalize'  >{row.status}</Typography>
                      </Stack>
                      <Stack spacing={1} flexDirection='row'><CalendarMonthIcon color='action' sx={{ width: 23, height: 23, }} />{dayjs(row.resolve_at).format('DD/MM/YYYY')} </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} flexDirection='row'><WarningAmberIcon color='action'
                      sx={{ width: 23, height: 23, }} /> <Typography variant='body1' color='action' textTransform='capitalize'> {row.keywords![0]}</Typography></Stack>
                    <Stack spacing={1} flexDirection='row'><SettingsIcon color='action'
                      sx={{ width: 23, height: 23, }} /><Typography variant='body1' color='action'>{row.setor}</Typography></Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} flexDirection='row'>
                      <Typography variant='subtitle1' color='action'>Nome do Tecnico</Typography>
                    </Stack>
                  </TableCell>

                  {/* Botão */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <MoreVertOutlinedIcon />
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
