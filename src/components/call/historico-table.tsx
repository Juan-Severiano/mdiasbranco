import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useSelection } from '../../hooks/use-selection';
import { Call } from '../../types/call';

// ICONS
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { api } from '../../services/api';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Call[];
  rowsPerPage?: number;
}

export function HistoricoTable({
  rows = [],
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selected } = useSelection(rowIds);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(rows)
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              if (row.called_state !== 'fechada_com_sucesso') return
              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ marginLeft: 5 }} flexDirection="column">
                      <Typography variant="h6">
                        {row.title}
                      </Typography>
                      <Typography variant="body1">
                        {row.user?.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                      <Stack spacing={1} flexDirection='row'>
                        <Brightness1Icon
                          color={
                            row.called_state === 'aberto' ? 'success'
                              : row.called_state === 'fechada_com_falha' ? 'error'
                                : row.called_state === 'fechada_com_sucesso' ? 'success'
                                  : 'warning'
                          }
                        /><Typography variant='body1' color='action' textTransform='capitalize'>{row.called_state}</Typography></Stack>
                      <Stack spacing={1} flexDirection='row'><CalendarMonthIcon color='action' />{dayjs(row.created_at).format('DD/MM/YYYY')}</Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={1} flexDirection='row'><WarningAmberIcon color='action' /> <Typography variant='body1' color='action' textTransform='capitalize'> {row.priority}</Typography></Stack>
                    <Stack spacing={1} flexDirection='row'><SettingsIcon color='action' /><Typography variant='body1' color='action' textTransform='uppercase'> {row.user?.sector}</Typography></Stack>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems='center' justifyContent='flex-end'>
                      <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose}
                      >
                        <MenuItem onClick={async () => {
                          await api.patch(`/call/${row.id}`, { called_state: 'aberto' })
                          location.reload()
                        }}>Abrir/Resolver</MenuItem>
                        <MenuItem onClick={async () => {
                          await api.patch(`/call/${row.id}`, { called_state: 'fechada_com_sucesso' })
                          location.reload()
                        }}>Fechar Chamado(sucesso)</MenuItem>
                        <MenuItem onClick={async () => {
                          await api.patch(`/call/${row.id}`, { called_state: 'fechada_com_falha' })
                          location.reload()
                        }}>Finalizar Chamado(falha)</MenuItem>
                      </Menu>
                    </Stack>
                  </TableCell>
                  <TableCell >
                    <Typography variant='h6'>
                      {row.technician}
                    </Typography>
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
