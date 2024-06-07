import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Startup } from '../../../types/problem';
import { startups } from '../../../mock/startup';
import { StartupTable } from '../../../components/startup/table-list';
import { CallFilters } from '../../../components/startup/filter';

export default function ManagerStartup() {
  const [filteredProblems, setFilteredProblems] = React.useState(startups);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  const applyPagination = (rows: Startup[], page: number, rowsPerPage: number): Startup[] => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const applyFilters = () => {
    let filtered = startups.filter(problem => {
      if (searchKeyword && !problem.cnpj.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }
      if (selectedDate && problem.corporate_reason !== selectedDate) {
        return false;
      }
      if (selectedPriority && problem.sector !== selectedPriority) {
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
      <StartupTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}
