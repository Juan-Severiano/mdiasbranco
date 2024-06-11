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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Startup } from '../../types/problem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

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
                      <Typography variant="subtitle2">Nome Da Startup</Typography>
                      <Typography variant="body2">{row.corporate_reason}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      justifyContent="center"
                    >
                      <Stack spacing={1} flexDirection="row" alignItems="center">
                        <AssignmentIndOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                        <Typography 
                        variant="body2"
                        textTransform={'uppercase'}
                        >Cnpj</Typography>
                      </Stack>
                      <Stack spacing={1} flexDirection="row" alignItems="center">
                        <InterestsOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                        <Typography variant="body2">Razão Social</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <WarningAmberIcon color="action" sx={{ fontSize: '1.25rem' }} />
                      <Typography
                        variant="body2"
                        color="action"
                        textTransform="capitalize"
                      >
                        {row.service}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <EmailOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                      <Typography
                        variant="body2"
                        color="action"
                      textTransform="capitalize"
                      >
                        {row.email}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="action">
                      Lorem
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" justifyContent="flex-end">
                      <IconButton>
                        <MoreVertIcon sx={{ fontSize: '1.25rem' }} />
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
