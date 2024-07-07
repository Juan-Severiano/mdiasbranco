import React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Grid, InputAdornment, InputLabel, SelectChangeEvent, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { CalendarMonth, LibraryAdd } from '@mui/icons-material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Amarelo from '../../../public/Status/analisys.jpeg';
import Azul from '../../../public/Status/pending.jpeg';
import Ciano from '../../../public/Status/open.jpeg';
import Vermelho from '../../../public/Status/concluted.jpeg';
import CustomOutlinedInput from '../../styles/theme/custom-outlined-input';
import CustomSelect from '../../styles/theme/custom-select';

// Icon do botão de alternancia
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useCustomContext } from '../../contexts/context';

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
  setToogleRender: React.Dispatch<React.SetStateAction<'list' | 'grid'>>,
  toogleRender: string
}

export function CallFilters({
  setSelectedDate,
  setSelectedPriority,
  setSelectedStatus,
  setToogleRender,
  toogleRender
}: CallProps) {
  const { dispatch } = useCustomContext()
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleRenderFile1 = () => {
    setToogleRender("grid")
  };

  const handleRenderFile2 = () => {
    setToogleRender("list");
  };

  return (
    <Card sx={{ py: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <FormControl fullWidth >
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
              value='dd/mm/2024'
              onChange={handleDateChange}
              aria-label="Filtrar por Data"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Prioridade</InputLabel>
            <CustomSelect
              label='Prioridade'
              sx={{ backgroundColor: '#fff' }}
              startAdornment={
              <CrisisAlertIcon color='disabled' />}
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

        <Grid item xs={12} sm={6} md={2}>
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

        <Grid item sm={12} md={2}>
          <ToggleButtonGroup
            value={toogleRender}
            exclusive
            aria-label="file-toggle-buttons"
            sx={{ bgcolor: '#fff', height: '100%' }}
          >
            <ToggleButton sx={{ border: 'none' }} value="grid" onClick={handleRenderFile1}>
              <WindowOutlinedIcon />
            </ToggleButton>
            <ToggleButton sx={{ border: 'none' }} value="list" onClick={handleRenderFile2}>
              <FormatListBulletedOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>


        <Grid item sm={12} md={.5} />
        <Grid item sm={12} md={2.5}>
          <Button
            variant="contained"
            sx={{
              height: '100%',
              width: '100%'
            }}
            onClick={() => {
              dispatch({ type: 'CHANGE-MODAL', payload: true })
            }}
            startIcon={<LibraryAdd />}
          >
            Solicitar Chamado
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
