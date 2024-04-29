import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CallFilters } from '../../../components/call/filter';
import { CustomersTable } from '../../../components/call/table-list';
import { problems } from '../../../mock/problemas';
import { Problem } from '../../../types/problem';

export default function ManagerHome() {
  const [filteredProblems, setFilteredProblems] = React.useState(problems);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  const applyPagination = (rows: Problem[], page: number, rowsPerPage: number): Problem[] => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const applyFilters = () => {
    let filtered = problems.filter(problem => {
      if (searchKeyword && !problem.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }
      if (selectedDate && problem.resolve_at !== selectedDate) {
        return false;
      }
      if (selectedPriority && problem.setor !== selectedPriority) {
        return false;
      }
      if (selectedStatus && problem.status !== selectedStatus) {
        return false;
      }
      return true;
    });
    setFilteredProblems(filtered);
  };

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
      />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
