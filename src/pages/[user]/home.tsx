import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CustomersTable } from '../../components/call/table-list';
import { CallFilters } from '../../components/call/filter';
import { problemsList } from '../../mock/problemas';
import { Problem } from '../../types/problem';
import { ProblemsGrid } from '../../components/call/table-grid';

export default function ManagerHome(): React.JSX.Element {
  const [filteredProblems, setFilteredProblems] = React.useState(problemsList);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toggleRender, setToggleRender] = React.useState<'list' | 'grid'>('list');

  // Função para aplicar todos os filtros 
  const applyFilters = React.useCallback(() => {
    let filtered = problemsList.filter(problem => {
      // Filtrar por palavra-chave
      if (searchKeyword && !problem.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }
      // Filtrar por data
      if (selectedDate && !isSameDate(new Date(problem.resolve_at), new Date(selectedDate))) {
        return false;
      }
      // Filtrar por prioridade
      if (selectedPriority && problem.setor.toLowerCase() !== selectedPriority.toLowerCase()) {
        return false;
      }
      // Filtrar por status
      if (selectedStatus && problem.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      return true;
    });
    setFilteredProblems(filtered);
  }, [searchKeyword, selectedDate, selectedPriority, selectedStatus]);

  // Função para verificar se duas datas são iguais
  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Chamada para aplicar todos os filtros quando os filtros mudarem
  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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
        setToogleRender={setToggleRender}
        toogleRender={toggleRender}
      />
       {
        toggleRender === 'grid' ?
          <ProblemsGrid
            count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage}
          /> : <CustomersTable count={paginatedCustomers.length}
            page={page}
            rows={paginatedCustomers}
            rowsPerPage={rowsPerPage}
          />
      }
    </Stack>
  );
}

export function applyPagination(rows: Problem[], page: number, rowsPerPage: number): Problem[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
