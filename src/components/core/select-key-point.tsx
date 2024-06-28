import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button, Card, CardActions, CardContent, CardHeader, InputAdornment, MenuItem } from '@mui/material';
import { Stack } from '@mui/system';
import CustomSelect from '../../styles/theme/custom-select';
import { Assignment } from '@mui/icons-material';
import { KeyPoints } from '../../constants/sector-options';

interface SelectKeyPointPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>
  setKeyPoint: React.Dispatch<React.SetStateAction<string>>
  name?: string
}

export function SelectKeyPointPopover({ anchorEl, onClose, open, setConfirm, name, setKeyPoint }: SelectKeyPointPopoverProps): React.JSX.Element {
  const onYesOrNot = async (controller: 'yes' | 'not') => {
    setConfirm(controller === 'yes' ? true : false)
    onClose()
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '440px' } } }}
    >
      <Card>
        <CardHeader title='Escolha o ponto chave' />
        <CardContent>
          <CustomSelect
            value={name}
            name="sector"
            onChange={e => {
              if (typeof e.target.value! === 'string') {
                setKeyPoint(e.target.value!)
              }
            }}
            fullWidth
            placeholder='Ponto Chave'
            startAdornment={
              <InputAdornment position="start"><Assignment /></InputAdornment>
            }
          >
            {Object.values(KeyPoints).map(keyPoint => (
              <MenuItem key={keyPoint} value={keyPoint}>
                {keyPoint}
              </MenuItem>
            ))}
          </CustomSelect>
        </CardContent>
        <CardActions>
          <Stack flexDirection='row' width='100%'>
            <Button fullWidth onClick={() => onYesOrNot('not')} variant='contained'>
              Salvar
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Popover>
  );
}
