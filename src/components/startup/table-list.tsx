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
import EditIcon from '@mui/icons-material/Edit';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid } from '@mui/material';
import { baseURL } from '../../config';
import { Trash } from '@phosphor-icons/react';
import { usePopover } from '../../hooks/use-popover';
import { deleteStartup } from '../../services/requests/startup';
import { ConfirmPopover } from '../core/confirm-popover';

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
  const navigate = useNavigate();
  const confirmPopover = usePopover<HTMLButtonElement>();
  const [confirm, setConfirm] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number | null>(null);
  const [name, setName] = React.useState<string | null>(null);

  const handleDelete = (id: number, name: string) => {
    confirmPopover.handleOpen();
    setId(id);
    setName(name);
  };
  
  React.useEffect(() => {
    async function confirmDelete() {
      if (confirm) {
        await deleteStartup(`${id}`)
        setConfirm(false);
      }
    }
    confirmDelete();
  }, [confirm]);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '200px' }}>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Stack direction="row" alignItems="center">
                          <Avatar
                            src={`${baseURL}/startup/attachment/${row.attachments?.path}`}
                            sx={{ width: { xs: 30, sm: 50 }, height: { xs: 30, sm: 50 } }}
                          />
                          <Stack sx={{ marginLeft: { xs: 2, sm: 5 } }} flexDirection="column">
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
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Stack direction="column">
                          <Stack spacing={1} direction="row" alignItems="center">
                            <AssignmentIndOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                            <Typography variant="body2" textTransform={'uppercase'}>{row.cnpj}</Typography>
                          </Stack>
                          <Stack spacing={1} direction="row" alignItems="center">
                            <InterestsOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                            <Typography variant="body2">{row.corporate_reason}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <EmailOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
                          <Typography variant="body2" color="action">
                            {row.email}
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Settings color="action" sx={{ fontSize: '1.25rem' }} />
                          <Typography variant="body2" color="action" textTransform="capitalize">
                            {row.sector}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Stack direction="row" justifyContent='end' spacing={1}>
                          <IconButton color="info" onClick={() => navigate(`/manager/startup/edit/${row.id!}`)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(row.id!, row.name!)}>
                            <Trash />
                          </IconButton>
                          <ConfirmPopover
                            anchorEl={confirmPopover.anchorRef.current}
                            onClose={confirmPopover.handleClose}
                            open={confirmPopover.open}
                            setConfirm={setConfirm}
                            name={name!}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
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
