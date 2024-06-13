import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { Stack } from '@mui/system';

interface ConfirmPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>
  name?: string
}

export function ConfirmPopover({ anchorEl, onClose, open, setConfirm, name }: ConfirmPopoverProps): React.JSX.Element {
  const onYesOrNot = (controller: 'yes' | 'not') => {
    setConfirm(controller === 'yes' ? true : false)
    onClose()
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '440px' } } }}
    >
      <Card>
        <CardHeader title={`Deseja excluir o(a) ${name}?`} />
        <CardActions>
          <Stack flexDirection='row' width='100%' justifyContent='space-between'>
            <Button sx={{ width: '90%', mr: 1 }} variant='contained' color='inherit' onClick={() => onYesOrNot('not')}>
              Não, Cancelar
            </Button>
            <Button sx={{ width: '90%' }} onClick={() => onYesOrNot('yes')} variant='contained'>
              Sim, Prossiga
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Popover>
  );
}
