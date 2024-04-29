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
// ICONS
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useCustomContext } from '../../contexts/context';
import { Startup } from '../../types/problem';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Startup[];
  rowsPerPage?: number;
}

export function StartupTable({
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
                        {row.corporate_reason}
                      </Typography>
                      <Typography variant="body1">
                        {row.cnpj}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center">
                      <Stack spacing={1} flexDirection='row'><CalendarMonthIcon color='action' />{(row.email)}</Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={1} flexDirection='row'><WarningAmberIcon color='action' /> <Typography variant='body1' color='action' textTransform='capitalize'> {row.service}</Typography></Stack>
                    <Stack spacing={1} flexDirection='row'><SettingsIcon color='action' /><Typography variant='body1' color='action' textTransform='uppercase'> {row.email}</Typography></Stack>
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
