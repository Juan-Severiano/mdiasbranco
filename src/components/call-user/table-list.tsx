import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { usePopover } from '../../hooks/use-popover';
import { deleteCall } from '../../services/requests/call';
import { status } from '../../constants/status';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
  reload: () => Promise<void>
}

export function ProblemsTableUser({
  rows = [],
  reload
}: CustomersTableProps): React.JSX.Element {

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableBody>
            {rows.map((row) => {
              return (
                <CallRow call={row} reload={reload} />
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

function CallRow({ call: row, reload }: { call: Problem, reload: () => Promise<void> }) {
  const { dispatch } = useCustomContext();
  const confirmPopover = usePopover<HTMLButtonElement>()
  const [confirm, setConfirm] = React.useState<boolean>(false)

  async function onDelete() {
    await deleteCall(row.id!)
    setConfirm(false)
  }

  React.useEffect(() => {
    async function confirmAsd() {
      if (confirm) {
        await onDelete()
        await reload()
      }
    }
    confirmAsd()
  }, [confirm, confirmPopover.open])

  // const handleDelete = async () => {
  //   confirmPopover.handleOpen()
  // };

  return (
    <TableRow
      hover
      key={row.id}
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
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {row.user_id?.name}
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
              color={status[row.status!]}
              sx={{ fontSize: '1.25rem' }}
            />
            <Typography
              variant="body2"
              color="textPrimary"
              sx={{ fontSize: '0.875rem' }}
              textTransform="capitalize"
            >
              {!row.status ? 'Pendente' : row.status}
            </Typography>
          </Stack>
          <Stack spacing={1} flexDirection="row" alignItems="center">
            <CalendarMonthIcon color="action" sx={{ fontSize: '1.25rem' }} />
            <Typography variant="body2" color="textPrimary" sx={{ fontSize: '0.875rem' }}>
              {dayjs(row.created_at).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={1} flexDirection="row" alignItems="center">
          <WarningAmberIcon color="action" sx={{ fontSize: '1.25rem' }} />
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{ fontSize: '0.875rem' }}
            textTransform="capitalize"
          >
            asd
          </Typography>
        </Stack>
        <Stack spacing={1} flexDirection="row" alignItems="center">
          <SettingsIcon color="action" sx={{ fontSize: '1.25rem' }} />
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{ fontSize: '0.875rem' }}
            textTransform="capitalize"
          >
            {row.sector}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems='center' flexDirection='row' justifyContent='space-between'>
          {/* <IconButton color='error' onClick={handleDelete}>
            <Trash />
          </IconButton>
          <ConfirmPopover
            anchorEl={confirmPopover.anchorRef.current}
            onClose={confirmPopover.handleClose}
            open={confirmPopover.open}
            setConfirm={setConfirm}
            name={row.title}
          /> */}
        </Stack>
      </TableCell>
    </TableRow>
  )
}