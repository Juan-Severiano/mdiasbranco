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

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Problem[];
  rowsPerPage?: number;
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
                <CardContent onClick={() => {
                  console.log('sd');
                  dispatch({ type: 'CHANGE-MODAL-DETAILS', payload: {
                    problem: row
                  } });
                }}>
                  <Typography variant="h6" gutterBottom fontSize={20}>
                    {row.title} {/* Título do item */}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {row.user?.name} {/* Nome do usuário */}
                  </Typography>
                  <Stack sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="space-between">
                    <Stack spacing={1} direction='row' marginTop={2} display={'flex'} alignItems={'center'}>
                      <Brightness1Icon sx={{ width: 17, height: 17, }}
                        color={
                          row.status === 'open' ? 'info'
                          : row.status === 'analisys' ? 'warning'
                          : row.status === 'pending' ? 'disabled'
                          : 'success'
                        }
                      />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{row.status}</Typography> {/* Status */}
                    </Stack>
                    <Stack spacing={1} direction='row' display={'flex'} alignItems={'center'}>
                      <CalendarMonthIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{dayjs(row.resolve_at).format('DD/MM/YYYY')}</Typography> {/* Data de resolução */}
                    </Stack>
                    <Stack spacing={1} direction='row' marginTop={2} display={'flex'} alignItems={'center'}>
                      <WarningAmberIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{row.keywords && row.keywords[0]}</Typography> {/* Palavras-chave */}
                      <SettingsIcon color='action' sx={{ width: 17, height: 17, }} />
                      <Typography variant='body1' color='textSecondary' textTransform='capitalize' fontSize={15}>{row.setor}</Typography> {/* Setor */}
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
