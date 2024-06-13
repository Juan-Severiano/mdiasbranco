import * as React from 'react';
import Stack from '@mui/material/Stack';
import { problems } from '../../../mock/problemas';
import { CallFilters } from '../../../components/call/filter';
import { CustomersTable } from '../../../components/call/table-list';
import { Problem } from '../../../types/problem';
import { ProblemsGrid } from '../../../components/call/table-grid';

export default function ManagerHome(): React.JSX.Element {
  const [filteredProblems, setFilteredProblems] = React.useState(problems);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');

  // Função para aplicar todos os filtros
  const applyFilters = () => {
    let filtered = problems.filter(problem => {
      // Filtrar por palavra-chave
      if (searchKeyword.toLowerCase() && !problem.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }
      // Filtrar por data
      if (selectedDate.toLowerCase() && problem.resolve_at !== selectedDate.toLowerCase()) {
        return false;
      }
      // Filtrar por prioridade
      if (selectedPriority.toLowerCase() && problem.setor !== selectedPriority.toLowerCase()) {
        return false;
      }
      // Filtrar por status
      if (selectedStatus.toLowerCase() && problem.status !== selectedStatus.toLowerCase()) {
        return false;
      }
      return true;
    });
    setFilteredProblems(filtered);
  }

  // Chamada para aplicar todos os filtros quando os filtros mudarem
  React.useEffect(() => {
    applyFilters();
  }, [searchKeyword, selectedDate, selectedPriority, selectedStatus]);

  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(filteredProblems, page, rowsPerPage);
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
      {
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
      }
    </Stack>
  );
}

function applyPagination(rows: Problem[], page: number, rowsPerPage: number): Problem[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
