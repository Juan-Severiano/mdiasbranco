import * as React from 'react';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Grid, InputLabel, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { Search } from '@mui/icons-material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const priority = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'Industria', label: 'Industria' },
  { value: 'Vendas', label: 'Vendas' }
];

interface CallProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>, 
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>, 
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>, 
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>> 
}

export function CallFilters({ 
  setSearchKeyword,
  setSelectedPriority,
}: CallProps) {
  const handleKeywordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setSelectedPriority(event.target.value);
  };

  return (
    <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={8}>
          <FormControl fullWidth>
            <InputLabel>Pesquisar</InputLabel>
            <OutlinedInput
              label="Pesquisar"
              startAdornment={<Search color="disabled" />}
              onChange={handleKeywordChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} md={4}>
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
      </Grid>
    </Card>
  );
}
