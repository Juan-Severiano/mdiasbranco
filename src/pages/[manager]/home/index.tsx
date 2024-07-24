import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CustomersTable } from '../../../components/call/table-list';
import { FilterParams, Problem } from '../../../types/problem';
import { ProblemsGrid } from '../../../components/call/table-grid';
import { getCalls } from '../../../services/requests/call';
import { useCustomContext } from '../../../contexts/context';
import { CallFilters } from '../../../components/call/filter';
import NotFoundItem from '../../(errors)/not-found-item';
import { Hidden, Pagination } from '@mui/material';

export default function ManagerHome(): React.JSX.Element {
  const [problems, setProblems] = React.useState<Problem[]>([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');
  const [page, setPage] = React.useState(1);
  const [totalProblems, setTotalProblems] = React.useState(0);
  const [rowsPerPage] = React.useState(12);
  const { state, dispatch } = useCustomContext();

  const fetch = async (search?: string, params?: FilterParams) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' });
    const res = await getCalls(search, { ...params, page: page, limit: rowsPerPage });
    setProblems(res.data);
    setTotalProblems(res.total);
    if (state.modalDetails.modal) {
      const problemToUpdate = res.data.filter((problem: Problem) => problem.id === state.modalDetails.problem?.id);
      dispatch({
        type: 'CHANGE-MODAL-DETAILS', payload: {
          problem: problemToUpdate[0]
        }
      });
    }
    dispatch({ payload: false, type: 'CHANGE-LOADING' });
  }

  React.useEffect(() => {
    fetch(state.search.search);
  }, [state.modal.modal, state.modalDetails.modal, state.search.search, page]);

  React.useEffect(() => {
    if (state.loading.refresh) {
      fetch(state.search.search);
    }
  }, [state.loading.refresh]);

  const applyFilters = async () => {
    try {
      const formattedDate = selectedDate ? new Date(selectedDate).toISOString() : '';
      fetch(state.search.search, {
        date: formattedDate,
        keySector: selectedPriority,
        status: selectedStatus,
        page: page + 1,
        limit: rowsPerPage
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchKeyword, selectedDate, selectedPriority, selectedStatus, page, rowsPerPage]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const _ = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <Stack spacing={3}>
      <CallFilters
        selectedDate={selectedDate}
        selectedPriority={selectedPriority}
        selectedStatus={selectedStatus}
        setSearchKeyword={setSearchKeyword}
        setSelectedDate={setSelectedDate}
        setSelectedPriority={setSelectedPriority}
        setSelectedStatus={setSelectedStatus}
        setToogleRender={setToogleRender}
        toogleRender={toogleRender}
      />
      {problems?.length > 0 ? (
        <>
          <Hidden smDown>
            {toogleRender === 'grid' ? (
              <ProblemsGrid
                count={totalProblems}
                page={page}
                rows={problems}
                rowsPerPage={rowsPerPage}
                reload={fetch}
              />
            ) : (
              <CustomersTable
                reload={fetch}
                count={totalProblems}
                page={page}
                rows={problems}
                rowsPerPage={rowsPerPage}
              />
            )}
          </Hidden>
          <Hidden smUp>
            <ProblemsGrid
              count={totalProblems}
              page={page}
              rows={problems}
              rowsPerPage={rowsPerPage}
              reload={fetch}
            />
          </Hidden>
        </>
      ) : (
        <NotFoundItem message='Não foi encontrado nenhum chamado aqui' />
      )}
      <Stack width='100%' flexDirection='row' justifyContent='center'>
        <Pagination
          count={Math.ceil(totalProblems / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Stack>
  );
}
