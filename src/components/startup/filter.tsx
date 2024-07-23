import React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Grid, Hidden, InputLabel, SelectChangeEvent, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CustomSelect from '../../styles/theme/custom-select';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const priority = [
  { value: 'Logística', label: 'Logística' },
  { value: 'Indústria', label: 'Indústria' },
  { value: 'Vendas', label: 'Vendas' }
];

interface CallProps {
  setSearchKeyword?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedPriority?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedStatus?: React.Dispatch<React.SetStateAction<string>>,
  setToogleRender?: React.Dispatch<React.SetStateAction<'list' | 'grid'>>,
  toogleRender?: string
}

export function CallFilters({
  setToogleRender,
  toogleRender
}: CallProps) {
  const navigate = useNavigate()
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handlePriorityChange = (event: SelectChangeEvent<unknown>) => {
    console.log(event);
  };

  const handleRenderFile1 = () => {
    setToogleRender!("grid");
  };

  const handleRenderFile2 = () => {
    setToogleRender!("list");
  };

  return (
    <Card sx={{ py: 2, display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} sm={4} md={4}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
            {!isSmallScreen && <InputLabel>Área de Atuação</InputLabel>}
            <CustomSelect
              label={isSmallScreen ? '' : 'Prioridade'}
              sx={{ backgroundColor: '#fff' }}
              startAdornment={<GroupOutlinedIcon color="disabled" />}
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
        <Grid item xs={3} sm={4} md={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={toogleRender}
              exclusive
              aria-label="file-toggle-buttons"
              sx={{ height: '100%', bgcolor: '#fff' }}
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
        <Grid item xs={3} sm={4} md={3}>
          <Hidden smUp>
            <Button
              variant="contained"
              sx={{
                height: 55,
                width: 50,
              }}
              onClick={() => {
                
              }}
            >
              <AddToPhotosIcon sx={{ fontSize: '2rem' }} />
            </Button>
          </Hidden>
          <Hidden smDown>
            <Button
              variant="contained"
              sx={{
                height: '100%',
                width: '100%',
                fontSize: '0.9rem',
                padding: '16px 20px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => {
                navigate('/manager/startup/create')
              }}
              startIcon={<AddToPhotosIcon sx={{ fontSize: '2rem' }} />}
            >
              Adicionar Startup
            </Button>
          </Hidden>
        </Grid>
      </Grid>
    </Card>
  );
}
