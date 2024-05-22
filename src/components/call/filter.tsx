import React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Grid, InputAdornment, InputLabel, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Amarelo from '../../../public/Status/analisys.jpeg';
import Azul from '../../../public/Status/pending.jpeg';
import Ciano from '../../../public/Status/open.jpeg';
import Vermelho from '../../../public/Status/concluted.jpeg';
import CustomOutlinedInput from '../../styles/theme/custom-outlined-input';
import CustomSelect from '../../styles/theme/custom-select';

const priority = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Industria', label: 'Industria' },
  { value: 'Vendas', label: 'Vendas' }
];

const status = [
  { value: 'pending', label: 'Pendente' },
  { value: 'open', label: 'Aberto' },
  { value: 'analisys', label: 'Analise' },
  { value: 'concluted', label: 'Concluido' },
];

interface CallProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>,
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>,
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
}

export function CallFilters({
  setSelectedDate,
  setSelectedPriority,
  setSelectedStatus
}: CallProps) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedStatus(event.target.value as string);
  };

  return (
    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <FormControl fullWidth>
          <InputLabel>Filtrar por Data</InputLabel>
          <CustomOutlinedInput
            label='Filtrar por Data'
            type='date'
            sx={{ backgroundColor: '#fff' }}
            startAdornment={
              <InputAdornment position="start">
                <CalendarMonth color="disabled" />
              </InputAdornment>
            }
            onChange={handleDateChange}
            aria-label="Filtrar por Data"
          />
        </FormControl>
        </Grid>

        <Grid item sm={12} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Prioridade</InputLabel>
            <CustomSelect
              label='Prioridade'
              sx={{ backgroundColor: '#fff' }}
              startAdornment={<CrisisAlertIcon color='disabled' />}
              onChange={handlePriorityChange}
              aria-label="Prioridade"
            >
              {priority.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
        </Grid>

        <Grid item sm={12} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Status</InputLabel>
            <CustomSelect
              label="Status"
              sx={{ backgroundColor: '#fff' }}
              startAdornment={
                <AvatarGroup max={4}>
                  <Avatar sx={{ width: 13, height: 13 }} src={Vermelho} alt="Vermelho" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Ciano} alt="Ciano" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Azul} alt="Azul" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Amarelo} alt="Amarelo" />
                </AvatarGroup>
              }
              onChange={handleStatusChange}
              aria-label="Status"
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack justifyContent='space-between' alignItems='center' flexDirection='row' width='100%'>
                    <Typography fontSize={15}>{option.label}</Typography>
                    <Avatar sx={{ width: 15, height: 15 }} src={`/Status/${option.value}.jpeg`} alt={`${option.label} status`} />
                  </Stack>
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}
