import * as React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Select } from '@mui/material';
import { CalendarMonth, Search } from '@mui/icons-material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Amarelo from '../../../public/Status/amarelo.jpeg';
import Azul from '../../../public/Status/azul.jpeg';
import Ciano from '../../../public/Status/ciano.jpeg';
import Vermelho from '../../../public/Status/vermelho.jpeg';

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
  const handleKeywordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedPriority(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Data</InputLabel>
            <OutlinedInput
              label='Filtrar'
              type='date'
              startAdornment={<InputAdornment position="start">
                <CalendarMonth color="disabled" /></InputAdornment>}
              endAdornment={null}
              onChange={handleDateChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Setor</InputLabel>
            <Select
              label='Setor'
              startAdornment={<WarningAmberIcon color={'disabled'} />}
              onChange={handlePriorityChange}>
              {priority.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label='Status'
              startAdornment={
                <AvatarGroup >
                  <Avatar sx={{ width: 13, height: 13, }} src={Vermelho} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Ciano} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Azul} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Amarelo} />
                </AvatarGroup>
              }
              onChange={handleStatusChange}>
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Botao */}
      </Grid>
    </Card>
  );
}
