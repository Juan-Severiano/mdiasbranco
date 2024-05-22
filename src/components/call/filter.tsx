import React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Amarelo from '../../../public/Status/analisys.jpeg';
import Azul from '../../../public/Status/pending.jpeg';
import Ciano from '../../../public/Status/open.jpeg';
import Vermelho from '../../../public/Status/concluted.jpeg';

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
  setSearchKeyword,
  setSelectedDate,
  setSelectedPriority,
  setSelectedStatus
}: CallProps) {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedStatus(event.target.value as string);
  };

  return (
    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent', boxShadow: 3, borderRadius: 2 }}>
    <Grid container spacing={2}>
      <Grid item sm={12} md={3}>
        <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
          <InputLabel>Filtrar por Data</InputLabel>
          <OutlinedInput
            label='Filtrar por Data'
            type='date'
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
          <Select
            label='Prioridade'
            startAdornment={<CrisisAlertIcon color='disabled' />}
            onChange={handlePriorityChange}
            aria-label="Prioridade"
          >
            {priority.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item sm={12} md={2}>
        <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
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
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </Card>
  );
}
