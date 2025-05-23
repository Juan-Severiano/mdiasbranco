import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CustomersTable } from '../../../components/call/table-list';
import { Problem } from '../../../types/problem';
import { ProblemsGrid } from '../../../components/call/table-grid';
import { getHistoricCalls } from '../../../services/requests/call';
import { HistoricFilters } from '../../../components/historic/filter';
import { useCustomContext } from '../../../contexts/context';
import NotFoundItem from '../../(errors)/not-found-item';

export default function ManagerHome(): React.JSX.Element {
  const [problems, setProblems] = React.useState<Problem[]>([])
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');
  const { state } = useCustomContext()

  const fetch = async () => {
    const res = await getHistoricCalls();
    setProblems(res)
  }

  React.useEffect(() => {
    fetch()
  }, [state.modal.modal, state.modalDetails.modal])

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

  return (
    <Stack spacing={3}>
      <HistoricFilters
        setSearchKeyword={setSearchKeyword}
        setSelectedDate={setSelectedDate}
        setSelectedPriority={setSelectedPriority}
        setSelectedStatus={setSelectedStatus}
        setToogleRender={setToogleRender}
        toogleRender={toogleRender}
      />
      {problems?.length > 0 ?
        (
          toogleRender === 'grid' ? <ProblemsGrid
            count={problems.length}
            page={page}
            rows={problems}
            rowsPerPage={rowsPerPage}
            reload={fetch}
          /> : <CustomersTable
            reload={fetch}
            count={problems.length}
            page={page}
            rows={problems}
            rowsPerPage={rowsPerPage}
          />
        ) : <NotFoundItem message='Não foi encontrado nenhum chamado finalizado por enquanto' />
      }
    </Stack>
  );
}
