import * as React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Amarelo from '../../../public/Status/analisys.jpeg';
import Azul from '../../../public/Status/pending.jpeg';
import Ciano from '../../../public/Status/open.jpeg';
import Vermelho from '../../../public/Status/concluted.jpeg';

//icon do botão de alternancia
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

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
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>,
  setToogleRender: React.Dispatch<React.SetStateAction<string>>,
  toogleRender: string
}

export function CallFilters({
  setSelectedDate,
  setSelectedPriority,
  setSelectedStatus,
  setToogleRender,
  toogleRender
}: CallProps) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedPriority(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleRenderFile1 = () => {
    // Implementação para renderizar o arquivo 1
    setToogleRender("grid")
  };

  const handleRenderFile2 = () => {
    // Implementação para renderizar o arquivo 2
    setToogleRender("list"); // Exemplo: definindo o conteúdo do arquivo como uma string
  };

  return (
    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel>Filtrar por Data</InputLabel>
            <OutlinedInput
              label='Filtrar por Data'
              type='date'
              startAdornment={<InputAdornment position="start">
                <CalendarMonth color="disabled" />
              </InputAdornment>}
              onChange={handleDateChange}
            />
          </FormControl>
        </Grid>

        <Grid item sm={12} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel>Prioridade</InputLabel>
            <Select
              label='Prioridade'
              startAdornment={<CrisisAlertIcon color={'disabled'} />}
              onChange={handlePriorityChange}>
              {priority.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={12} md={3}>
          <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              startAdornment={
                <AvatarGroup>
                  <Avatar sx={{ width: 13, height: 13 }} src={Vermelho} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Ciano} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Azul} />
                  <Avatar sx={{ width: 13, height: 13 }} src={Amarelo} />
                </AvatarGroup>
              }
              onChange={handleStatusChange}
            >
              {status.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  <Stack justifyContent='space-between' alignItems='center' flexDirection='row' width='100%'>
                    <Typography fontSize={15}>{option.label}</Typography>
                    <Avatar sx={{ width: 15, height: 15 }} src={`/Status/${option.value}.jpeg`} />
                  </Stack>

                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Botao */}
        <Grid item sm={12} md={2}>
          <ToggleButtonGroup
            value={toogleRender}
            exclusive
            aria-label="file-toggle-buttons"
          >
            <ToggleButton value="grid" onClick={handleRenderFile1}>
              <WindowOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="list" onClick={handleRenderFile2}>
              <FormatListBulletedOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {toogleRender}
    </Card>
  );
}