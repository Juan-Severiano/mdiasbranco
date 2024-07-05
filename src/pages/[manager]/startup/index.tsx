import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Startup } from '../../../types/problem';
import { StartupTable } from '../../../components/startup/table-list';
import { CallFilters } from '../../../components/startup/filter';
import { getStartups } from '../../../services/requests/startup';
import { StartupGrid } from '../../../components/startup/table-grid';

export default function ManagerStartup() {
  const [startups, setStartups] = React.useState<Startup[]>([])
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    const get = async () => {
      const res = await getStartups()
      setStartups(res)
    }
    get()
  }, [])

  const applyPagination = (rows: Startup[], page: number, rowsPerPage: number): Startup[] => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const page = 0;
  const rowsPerPage = 10;
  const paginatedCustomers = applyPagination(startups, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <CallFilters
        setToogleRender={setToogleRender}
        toogleRender={toogleRender}
      />
      {
        toogleRender === 'grid' ? (
          <StartupGrid
            count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage} reload={function (): Promise<void> {
              throw new Error('Function not implemented.');
            }} />
        ) : (
          <StartupTable
            count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage} />
        )
      }

    </Stack>
  );
}
