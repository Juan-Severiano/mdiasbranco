import React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Grid, InputLabel, SelectChangeEvent, Stack, ToggleButton, ToggleButtonGroup,  } from '@mui/material';
import CustomSelect from '../../styles/theme/custom-select';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const priority = [
  { value: 'juan', label: 'Juan' },
  { value: 'Industria', label: 'Industria' },
  { value: 'Vendas', label: 'Vendas' }
];
interface CallProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>,
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>,
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>,
  setToogleRender?: React.Dispatch<React.SetStateAction<'list' | 'grid'>>,
  toogleRender?: string
}

export function CallFilters({
  setSelectedPriority,
  setSelectedStatus,
  setToogleRender,
  toogleRender
}: CallProps) {

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleRenderFile1 = () => {
    setToogleRender!("grid")
  };

  const handleRenderFile2 = () => {
    setToogleRender!("list");
  };

  return (
    <Card sx={{  py: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={12} md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Área de Atuação</InputLabel>
            <CustomSelect
              label='Prioridade'
              sx={{ backgroundColor: '#fff' }}
              startAdornment={<GroupOutlinedIcon color='disabled' />}
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
        <Grid item sm={12}  md={2}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Localização</InputLabel>
            <CustomSelect
              label='Prioridade'
              sx={{ backgroundColor: '#fff' }}
              startAdornment={<LocationOnOutlinedIcon color='disabled' />}
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

        <Grid item sm={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={toogleRender}
              exclusive
              aria-label="file-toggle-buttons"
              sx={{ height: '100% ', bgcolor: '#fff' }}
            >
           <ToggleButton sx={{ border: 'none', fontSize: '1.5rem', padding: '17px 9px' }} value="grid" onClick={handleRenderFile1}>
                <WindowOutlinedIcon sx={{ fontSize: '1.5rem' }} />
              </ToggleButton>
              <ToggleButton sx={{ border: 'none', fontSize: '1.5rem', padding: '12px 9px' }} value="list" onClick={handleRenderFile2}>
                <FormatListBulletedOutlinedIcon sx={{ fontSize: '1.5rem' }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        
        <Grid item sm={12} md={2}>
          <Button
            sx={{
              height: '100%',
              width: '100%',
              fontSize: '0.9rem', 
              padding: '16px 20px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            variant="contained"
            color="primary"
            startIcon={<AddToPhotosIcon sx={{ fontSize: '2rem' }} />} // Increase icon size
          >
            Adicionar Startup
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
