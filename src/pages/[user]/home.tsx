import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Problem } from '../../types/problem';
import { getCalls } from '../../services/requests/call';
import { HistoricFilters } from '../../components/historic/filter';
import { useCustomContext } from '../../contexts/context';
import NotFoundItem from '../(errors)/not-found-item';
import { ProblemsGridUser } from '../../components/call-user/table-grid';
import { ProblemsTableUser } from '../../components/call-user/table-list';

export default function ManagerHome(): React.JSX.Element {
  const [problems, setProblems] = React.useState<Problem[]>([])
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');
  const { state } = useCustomContext()

  const fetch = async (search?: string) => {
    const res = await getCalls(search);
    setProblems(res)
  }

  React.useEffect(() => {
    fetch(state.search.search)
  }, [state.modal.modal, state.modalDetails.modal, state.search.search])

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
      {problems.length > 0 ?
        (
          toogleRender === 'grid' ? <ProblemsGridUser
            count={problems.length}
            page={page}
            rows={problems}
            rowsPerPage={rowsPerPage}
            reload={fetch}
          /> : <ProblemsTableUser
            reload={fetch}
            count={problems.length}
            page={page}
            rows={problems}
            rowsPerPage={rowsPerPage}
          />
        ) : <NotFoundItem message='Nenhum chamado encontrado' />
      }
    </Stack>
  );
}
