import * as React from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { Startup } from '../../types/problem';
import { Trash } from '@phosphor-icons/react';
import { usePopover } from '../../hooks/use-popover';
import { ConfirmPopover } from '../core/confirm-popover';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Startup[];
  rowsPerPage?: number;
  reload: () => Promise<void>;
}

interface StartupCardProps {
  startup: Startup;
  onStartupClick: (startup: Startup) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onStartupClick }) => {
  const navigate = useNavigate();
  const confirmPopover = usePopover<HTMLButtonElement>();
  const [confirm, setConfirm] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>(0);
  const [name, setName] = React.useState<string>('');

  const handleDelete = (id: number, name: string) => {
    confirmPopover.handleOpen();
    setId(id);
    setName(name);
  };

  React.useEffect(() => {
    async function confirmDelete() {
      if (confirm) {
        // Função de exclusão aqui
        setConfirm(false);
      }
    }
    confirmDelete();
  }, [confirm]);

  return (
    <Grid item xs={12} sm={6} md={4} key={startup.id}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              variant="h6"
              gutterBottom
              fontSize={20}
              sx={{ ':hover': { textDecoration: 'underline' } }}
              onClick={() => onStartupClick(startup)}
            >
              {startup.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="info">
                {/* <BookmarkOutlined /> */}
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(startup.id!, startup.name!)}>
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
            {startup.service}
          </Typography>
          <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <InterestsOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
              <Typography variant="body2" textTransform="uppercase">
                {startup.cnpj}
              </Typography>
              <AssignmentIndOutlinedIcon color="action" sx={{ fontSize: '1.25rem', marginLeft: 1 }} />
              <Typography variant="body2" textTransform="uppercase">
                {startup.corporate_reason}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailOutlinedIcon color="action" sx={{ fontSize: '1.25rem' }} />
              <Typography variant="body1" color="textSecondary" textTransform="capitalize" fontSize={15}>
                {startup.email}
              </Typography>
              <SettingsIcon color="action" sx={{ fontSize: '1.25rem', marginLeft: 1 }} />
              <Typography variant="body1" color="textSecondary" textTransform="capitalize" fontSize={15}>
                {startup.sector}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const StartupGrid: React.FC<CustomersTableProps> = ({ rows = [] }) => {
  const handleStartupClick = (startup: Startup) => {
    // Ação ao clicar no card
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12 }}>
        {rows.map((row) => (
          <StartupCard key={row.id} startup={row} onStartupClick={handleStartupClick} />
        ))}
      </Grid>
    </Box>
  );
};
