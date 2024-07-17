import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkOutlined from '@mui/icons-material/BookmarkAddOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';
import IconButton from '@mui/material/IconButton';
import { Table, TableBody, TableCell, TableRow, Grid, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { Trash } from '@phosphor-icons/react';
import { usePopover } from '../../hooks/use-popover';
import { deleteCall, deleteCallByKeyPoint, saveCallByKeyPoint } from '../../services/requests/call';
import { ConfirmPopover } from '../core/confirm-popover';
import { status } from '../../constants/status';
import { localClient } from '../../lib/local/client';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
  reload: () => Promise<void>;
}

export function CustomersTable({
  rows = [],
  reload
}: CustomersTableProps): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: isMobile ? '100%' : '800px' }}>
          <TableBody>
            {rows.map((row) => {
              return (
                <CallRow key={row.id} call={row} reload={reload} />
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

function CallRow({ call: row, reload }: { call: Problem, reload: () => Promise<void> }) {
  const { data: user } = localClient.getUser();
  const { dispatch } = useCustomContext();
  const [keypoint] = React.useState('exemplo1');
  const confirmPopover = usePopover<HTMLButtonElement>();
  const [confirm, setConfirm] = React.useState<boolean>(false);

  async function onDelete() {
    await deleteCall(row.id!);
    setConfirm(false);
  }

  async function handleBookmark() {
    if (!row.isBookmarked) {
      await saveCallByKeyPoint(String(user!.id!), String(row.id), keypoint);
      await reload();
      return;
    }
    await deleteCallByKeyPoint(String(user!.id!), String(row.id));
    await reload();
  }

  React.useEffect(() => {
    async function confirmAsd() {
      if (confirm) {
        await onDelete();
        await reload();
      }
    }
    confirmAsd();
  }, [confirm, confirmPopover.open]);

  const handleDelete = async () => {
    confirmPopover.handleOpen();
  };

  return (
    <TableRow hover key={row.id}>
      <TableCell>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: 50, height: 50 }} />
              <Stack flexDirection="column">
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: '0.875rem',
                    ":hover": {
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
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
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Brightness1Icon color={status[row.status!]} sx={{ fontSize: '1.25rem' }} />
              <Typography
                variant="body2"
                color="textPrimary"
                sx={{
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {!row.status ? 'Pendente' : row.status}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <CalendarMonthIcon color="action" sx={{ fontSize: '1.25rem' }} />
              <Typography variant="body2" color="textPrimary" sx={{ fontSize: '0.875rem' }}>
                {dayjs(row.created_at).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack spacing={1} direction="row" alignItems="center">
              <WarningAmberIcon color="action" sx={{ fontSize: '1.25rem' }} />
              <Typography
                variant="body2"
                color="textPrimary"
                sx={{
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {row.corporate_reason}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
              <SettingsIcon color="action" sx={{ fontSize: '1.25rem' }} />
              <Typography
                variant="body2"
                color="textPrimary"
                sx={{
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {row.sector}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Stack direction="row" spacing={5}>
              <IconButton color="info" onClick={handleBookmark}>
                {row.isBookmarked ? <BookmarkAddIcon /> : <BookmarkOutlined />}
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <Trash />
              </IconButton>
              <ConfirmPopover
                anchorEl={confirmPopover.anchorRef.current}
                onClose={confirmPopover.handleClose}
                open={confirmPopover.open}
                setConfirm={setConfirm}
                name={row.title}
              />
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
