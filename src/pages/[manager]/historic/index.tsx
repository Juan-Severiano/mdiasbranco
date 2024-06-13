import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CallFilters } from '../../../components/call/filter';
import { CustomersTable } from '../../../components/call/table-list';
import { Problem } from '../../../types/problem';
import { ProblemsGrid } from '../../../components/call/table-grid';
import { getCalls } from '../../../services/requests/call';

export default function ManagerHome(): React.JSX.Element {
  const [problems, setProblems] = React.useState<Problem[]>([])
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    const fetch = async () => {
      const res = await getCalls();
      setProblems(res)
    }
    fetch()
  }, [])

  const applyFilters = () => {
    // let filtered = problems.filter(problem => {
    //   // Filtrar por palavra-chave
    //   if (searchKeyword.toLowerCase() && !problem.title!.toLowerCase().includes(searchKeyword.toLowerCase())) {
    //     return false;
    //   }
    //   // Filtrar por data
    //   if (selectedDate.toLowerCase() && problem.resolve_at !== selectedDate.toLowerCase()) {
    //     return false;
    //   }
    //   // Filtrar por prioridade
    //   if (selectedPriority.toLowerCase() && problem.sector !== selectedPriority.toLowerCase()) {
    //     return false;
    //   }
    //   // Filtrar por status
    //   if (selectedStatus.toLowerCase() && problem.status !== selectedStatus.toLowerCase()) {
    //     return false;
    //   }
    //   return true;
    // });
    // setFilteredProblems(filtered);
  }

  React.useEffect(() => {
    applyFilters();
  }, [searchKeyword, selectedDate, selectedPriority, selectedStatus]);

  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(problems, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <CallFilters
        setSearchKeyword={setSearchKeyword}
        setSelectedDate={setSelectedDate}
        setSelectedPriority={setSelectedPriority}
        setSelectedStatus={setSelectedStatus}
        setToogleRender={setToogleRender}
        toogleRender={toogleRender}
      />
      {problems.length > 0 ?
        (
          toogleRender === 'grid' ? <ProblemsGrid
            count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage}
          /> : <CustomersTable
            count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage}
          />
        ) : null
      }
    </Stack>
  );
}

function applyPagination(rows: Problem[], page: number, rowsPerPage: number): Problem[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
