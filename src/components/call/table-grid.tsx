import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// ICONS
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import dayjs from 'dayjs';
import { useCustomContext } from '../../contexts/context';
import { Problem } from '../../types/problem';

import { CardContent, Grid } from '@mui/material';
import { status } from '../../constants/status';

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12 }}>
        {rows.map((row) => {
          return (
            <Grid item xs={3} sm={6} md={4} key={row.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontSize={20} sx={{ ":hover": { textDecoration: 'underline' } }} onClick={() => {
                    dispatch({
                      type: 'CHANGE-MODAL-DETAILS', payload: {
                        problem: row
                      }
                    });
                  }}>
                    {row.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {row.user?.name}
                  </Typography>
                  <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="space-between">
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
                    <Stack spacing={1} direction='row' display={'flex'} alignItems={'center'}>
                      <CalendarMonthIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{dayjs(row.created_at).format('DD/MM/YYYY')}</Typography> {/* Data de resolução */}
                    </Stack>
                    <Stack spacing={1} direction='row' marginTop={2} display={'flex'} alignItems={'center'}>
                      <WarningAmberIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>Asd</Typography> {/* Palavras-chave */}
                      <SettingsIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{row.sector}</Typography> {/* Setor */}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
