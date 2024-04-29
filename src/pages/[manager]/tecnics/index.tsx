import * as React from 'react';
import Stack from '@mui/material/Stack';
import { NotFoundCalls } from '../../../components/not-found-calls';
import { User } from '../../../types/user';
import { getUsers } from '../../../services/requests/user';
import { TecnicosTable } from '../../../components/tecnicos/table-list';
import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function ManagerHome(): React.JSX.Element {
  const [users, setCalls] = React.useState<User[]>([]);
  const page = 0;
  const rowsPerPage = 10;

  React.useEffect(() => {
    async function get() {
      try {
        const response = await getUsers();
        setCalls(response)
      } catch (error) {
        console.log(error)
      }
    }
    get()
  }, [])

  const paginatedCustomers = applyPagination(users, page, rowsPerPage);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
            Relatório
          </Typography>
        </Stack>
        <div>
          <Button startIcon={<Add />} variant="contained">
            Baixar Relatório
          </Button>
        </div>
      </Stack>
      {
        (users.length < 0) ? <NotFoundCalls /> : <TecnicosTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      }
    </Stack>
  );
}

function applyPagination(rows: User[], page: number, rowsPerPage: number): User[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
