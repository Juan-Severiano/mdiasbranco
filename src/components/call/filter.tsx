import React, { useState } from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Grid, Hidden, InputAdornment, InputLabel, SelectChangeEvent, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useCustomContext } from '../../contexts/context';
import { statusAsIndex, status as stts } from "../../constants/status";
import { Status } from '../../constants/status';

const priority = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Industria', label: 'Industria' },
  { value: 'Vendas', label: 'Vendas' }
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
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { dispatch } = useCustomContext();
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  const [status, setStatus] = useState('');

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<unknown>) => {
    setStatus(event.target.value as string)
    setSelectedStatus(event.target.value as string);
  };

  const handleRenderFile1 = () => {
    setToogleRender("grid");
  };

  const handleRenderFile2 = () => {
    setToogleRender("list");
  };

  const theme = useTheme()

  return (
    <Card sx={{ py: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item xs={2} sm={2} md={3} lg={2}>
            <FormControl fullWidth>
              {!isSmallScreen && <InputLabel>Filtrar por Data</InputLabel>}
              <CustomOutlinedInput
                label={!isSmallScreen ? 'Filtrar por Data' : ''}
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
        </Hidden>

        <Grid item xs={3} sm={2} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            {!isSmallScreen && <InputLabel>Prioridade</InputLabel>}
            <CustomSelect
              label={!isSmallScreen ? 'Prioridade' : ''}
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

        <Grid item xs={3} sm={2} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            {!isSmallScreen && <InputLabel>Status</InputLabel>}
            {/* <CustomSelect
              label={!isSmallScreen ? 'Status' : ''}
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
            > */}
            {/* {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack justifyContent='space-between' alignItems='center' flexDirection='row' width='100%'>
                    <Typography fontSize={15}>{option.label}</Typography>
                    <Avatar sx={{ width: 15, height: 15 }} src={`/Status/${option.value}.jpeg`} alt={`${option.label} status`} />
                  </Stack>
                </MenuItem>
              ))} */}
            <CustomSelect
              label="Status"
              sx={{ backgroundColor: '#fff' }}
              onChange={handleStatusChange}
              aria-label="Status"
              value={status}
              startAdornment={
                <AvatarGroup max={4}>
                  <Avatar sx={{ width: 13, height: 13 }} src={Vermelho} alt="Vermelho" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Ciano} alt="Ciano" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Azul} alt="Azul" />
                  <Avatar sx={{ width: 13, height: 13 }} src={Amarelo} alt="Amarelo" />
                </AvatarGroup>
              }
            >
              {Object.entries(Status).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  <Stack alignItems='center' flexDirection='row' width='100%'>
                    {stts[value] && (
                      <Avatar
                        sx={{
                          width: 15,
                          height: 15,
                          mr: 2,
                          // @ts-ignore
                          bgcolor: theme.palette[statusAsIndex[value]][stts[value] !== 'action' ? 'main' : 'active']
                        }}
                        src='/Status/avatar-bg.png'
                        alt={`${value} status`}
                      />
                    )}
                    <Typography fontSize={15}>{value}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
        </Grid>

        <Grid item xs={3} sm={2} md={2}>
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
        <Hidden smDown>
          <Grid item xs={0} sm={0} md={.5} />
        </Hidden>
        <Grid item xs={2} sm={3} md={2.5}>
          <Hidden smUp>
            <Button
              variant="contained"
              sx={{
                height: 55,
                width: 50,
                ml: 'auto'
              }}
              onClick={() => {
                dispatch({ type: 'CHANGE-MODAL', payload: true });
              }}
            >
              <LibraryAdd />
            </Button>
          </Hidden>
          <Hidden smDown>
            <Button
              variant="contained"
              sx={{
                height: '100%',
                width: '100%',
              }}
              onClick={() => {
                dispatch({ type: 'CHANGE-MODAL', payload: true });
              }}
              startIcon={<LibraryAdd />}
            >
              Solicitar Chamado
            </Button>
          </Hidden>
        </Grid>
      </Grid>
    </Card >
  );
}
