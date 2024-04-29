import * as React from 'react';
import Stack from '@mui/material/Stack';
import { localClient } from '../../../lib/local/client';
import { Call } from '../../../types/call';
import { NotFoundCalls } from '../../../components/not-found-calls';
import { EquipamentsTable } from '../../../components/equipaments/table-list';
import { Equipaments } from '../../../types/equipaments';
import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const eqps = [
  {
    id: 2,
    name: 'Computador Dell',
    serial_number: '1234567890-09865',
    amount_maintenance: 1,
    reason_maintenance: 'Sem bateria',
    updated_at: new Date().toLocaleDateString()
  },
  {
    id: 3,
    name: 'Impressora EPSON',
    serial_number: '098765430-09865',
    amount_maintenance: 3,
    reason_maintenance: 'Tinta',
    updated_at: new Date().toLocaleDateString()
  },
  {
    id: 4,
    name: 'AP Intelbras',
    serial_number: '84936724-09865',
    amount_maintenance: 2,
    reason_maintenance: 'AP problemas',
    updated_at: new Date().toLocaleDateString()
  },
] satisfies Equipaments[]

export default function ManagerEquipamentos(): React.JSX.Element {
  const [eqp, setCalls] = React.useState<Call[]>([]);
  const { data: user } = localClient.getUser()
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(eqps, page, rowsPerPage);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
            Equipamentos
          </Typography>
        </Stack>
        <div>
          <Button startIcon={<Add />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      {
        (eqps.length < 0) ? <NotFoundCalls /> : <EquipamentsTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      }
    </Stack>
  );
}

function applyPagination(rows: Equipaments[], page: number, rowsPerPage: number): Equipaments[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
