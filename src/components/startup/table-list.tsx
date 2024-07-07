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
import Settings from '@mui/icons-material/Settings';
import { Startup } from '../../types/problem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { baseURL } from '../../config';

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
  const navigate = useNavigate()

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              console.log(row)
              return (
                <TableRow
                  hover
                  key={row.id}
                  selected={isSelected}
                >
                  <TableCell>
                    <Stack sx={{ marginLeft: 5 }} flexDirection="row">
                      <Avatar
                        src={`${baseURL}/startup/attachment/${row.attachments.path}`}
                      />
                      <Stack sx={{ marginLeft: 2 }} flexDirection="column">
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
                            navigate(`/manager/startup/${row.id}`)
                          }}
                        >
                          {row.name}
                        </Typography>
                        <Typography variant="body2">{row.service}</Typography>
                      </Stack>
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
                        >{row.cnpj}</Typography>
                      </Stack>
                      <Stack spacing={1} flexDirection="row" alignItems="center">
                        <InterestsOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                        <Typography variant="body2">{row.corporate_reason}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
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
                    <Stack spacing={1} flexDirection="row" alignItems="center">
                      <Settings color="action" sx={{ fontSize: '1.25rem' }} />
                      <Typography
                        variant="body2"
                        color="action"
                        textTransform="capitalize"
                      >
                        {row.sector}
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
