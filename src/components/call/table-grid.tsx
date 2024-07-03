import * as React from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';
import { status } from '../../constants/status';

// ícones de ações
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkOutlined from '@mui/icons-material/BookmarkAddOutlined';
import { Trash } from '@phosphor-icons/react';
import { localClient } from '../../lib/local/client';
import { usePopover } from '../../hooks/use-popover';
import { deleteCall, deleteCallByKeyPoint, saveCallByKeyPoint } from '../../services/requests/call';
import { ConfirmPopover } from '../core/confirm-popover';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
  reload: () => Promise<void>;
}

interface ProblemCardProps {
  problem: Problem;
  onProblemClick: (problem: Problem) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onProblemClick }) => {
  const { data: user } = localClient.getUser();
  const { dispatch } = useCustomContext();
  const [id, setId] = React.useState<number>(0);
  const [name, setName] = React.useState<string>('');
  const keypoint = 'exemplo1';
  const confirmPopover = usePopover<HTMLButtonElement>();
  const [confirm, setConfirm] = React.useState<boolean>(false);

  async function onDelete() {
    await deleteCall(id);
    setConfirm(false);
  }

  async function handleBookmark(id: string, isTrue: boolean) {
    setId(Number(id));
    if (!isTrue) {
      await saveCallByKeyPoint(String(user!.id!), String(id), keypoint);
      return;
    }
    await deleteCallByKeyPoint(String(user!.id!), String(id));
  }

  React.useEffect(() => {
    async function confirmAsd() {
      if (confirm) {
        await onDelete();
        // Reload the parent component after deleting
        await dispatch({ type: 'RELOAD' });
      }
    }
    confirmAsd();
  }, [confirm]);

  const handleDelete = (id: number, name: string) => {
    confirmPopover.handleOpen();
    setId(id);
    setName(name);
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={problem.id}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              variant="h6"
              gutterBottom
              fontSize={20}
              sx={{ ':hover': { textDecoration: 'underline' } }}
              onClick={() => onProblemClick(problem)}
            >
              {problem.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="info" onClick={() => handleBookmark(String(problem.id!), problem.isBookmarked)}>
                {problem.isBookmarked ? <BookmarkAddIcon /> : <BookmarkOutlined />}
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(problem.id!, problem.title!)}>
                <Trash />
              </IconButton>
              <ConfirmPopover
                anchorEl={confirmPopover.anchorRef.current}
                onClose={confirmPopover.handleClose}
                open={confirmPopover.open}
                setConfirm={setConfirm}
                name={name}
              />
            </Stack>
          </Stack>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {problem.user?.name || 'Usuário desconhecido'}
          </Typography>
          <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="space-between">
            <Stack spacing={1} direction="row" alignItems="center">
              <Brightness1Icon
                color={status[problem.status!] || 'default'}
                sx={{ fontSize: '1.25rem' }}
              />
              <Typography
                variant="body2"
                color="textPrimary"
                sx={{ fontSize: '0.875rem' }}
                textTransform="capitalize"
              >
                {problem.status || 'Pendente'}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" display="flex" alignItems="center">
              <CalendarMonthIcon color="action" sx={{ width: 17, height: 17 }} />
              <Typography variant="body1" color="textSecondary" textTransform="capitalize" fontSize={15}>
                {dayjs(problem.created_at).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="row" marginTop={2} display="flex" alignItems="center">
              <WarningAmberIcon color="action" sx={{ width: 17, height: 17 }} />
              <Typography variant="body1" color="textSecondary" textTransform="capitalize" fontSize={15}>
                Palavras-chave
              </Typography>
              <SettingsIcon color="action" sx={{ width: 17, height: 17 }} />
              <Typography variant="body1" color="textSecondary" textTransform="capitalize" fontSize={15}>
                {problem.sector}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const ProblemsGrid: React.FC<CustomersTableProps> = ({ rows = [] }) => {
  const { dispatch } = useCustomContext();

  const handleProblemClick = (problem: Problem) => {
    dispatch({
      type: 'CHANGE-MODAL-DETAILS',
      payload: { problem },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12 }}>
        {rows.map((row) => (
          <ProblemCard key={row.id} problem={row} onProblemClick={handleProblemClick} />
        ))}
      </Grid>
    </Box>
  );
};
