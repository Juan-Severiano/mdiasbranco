import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';
import { CardContent, Grid } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Trash } from '@phosphor-icons/react';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
  reload: () => Promise<void>
}

export function ProblemsGrid({
  rows = [],
}: CustomersTableProps): React.JSX.Element {
  const { dispatch } = useCustomContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12 }}>
        {rows.map((row) => (
          <Grid item xs={3} sm={6} md={4} key={row.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    fontSize={20} 
                    sx={{ ":hover": { textDecoration: 'underline' } }} 
                    onClick={() => {
                      dispatch({
                        type: 'CHANGE-MODAL-DETAILS', 
                        payload: { problem: row }
                      });
                    }}
                  >
                    {row.title}
                  </Typography>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <Box p={2}>
                    <IconButton color='info' onClick={handleClose}>
                      <BookmarkAddIcon />
                    </IconButton>
                    
                    <IconButton color='error' onClick={handleClose}>
                      <Trash />
                    </IconButton>
                    
                  </Box>
                </Popover>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {row.user?.name}
                </Typography>
                <Stack 
                  sx={{ display: 'flex', flexDirection: 'column' }} 
                  justifyContent="space-between"
                >
                  <Stack 
                    spacing={1} 
                    direction='row' 
                    marginTop={2} 
                    display='flex' 
                    alignItems='center'
                  >
                    <Brightness1Icon
                      color={
                        row.status === 'open' ? 'info' :
                        row.status === 'analisys' ? 'warning' :
                        row.status === 'pending' ? 'disabled' :
                        !row.status ? 'disabled' : 'success'
                      }
                      sx={{ fontSize: '1.25rem' }}
                    />
                    <Typography 
                      variant='body1' 
                      color='textSecondary' 
                      textTransform='capitalize' 
                      fontSize={15}
                    >
                      {!row.status ? 'Pendente' : row.status}
                    </Typography>
                  </Stack>
                  <Stack 
                    spacing={1} 
                    direction='row' 
                    display='flex' 
                    alignItems='center'
                  >
                    <CalendarMonthIcon 
                      color='action' 
                      sx={{ width: 17, height: 17 }} 
                    />
                    <Typography 
                      variant='body1' 
                      color='textSecondary' 
                      textTransform='capitalize' 
                      fontSize={15}
                    >
                      {dayjs(row.created_at).format('DD/MM/YYYY')}
                    </Typography>
                  </Stack>
                  <Stack 
                    spacing={1} 
                    direction='row' 
                    marginTop={2} 
                    display='flex' 
                    alignItems='center'
                  >
                    <WarningAmberIcon 
                      color='action' 
                      sx={{ width: 17, height: 17 }} 
                    />
                    <Typography 
                      variant='body1' 
                      color='textSecondary' 
                      textTransform='capitalize' 
                      fontSize={15}
                    >
                      {/* Palavras-chave */}
                      Asd
                    </Typography>
                    <SettingsIcon 
                      color='action' 
                      sx={{ width: 17, height: 17 }} 
                    />
                    <Typography 
                      variant='body1' 
                      color='textSecondary' 
                      textTransform='capitalize' 
                      fontSize={15}
                    >
                      {row.sector}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
