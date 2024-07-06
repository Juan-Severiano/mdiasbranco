import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CustomersTable } from '../../../components/call/table-list';
import { Problem } from '../../../types/problem';
import { getBookmarkedCalls } from '../../../services/requests/call';
import { useCustomContext } from '../../../contexts/context';

export default function ManagerBookmarked(): React.JSX.Element {
  const [problems, setProblems] = React.useState<Problem[]>([])
  const { state, dispatch } = useCustomContext()

  const fetch = async (search?: string) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' });
    const res = await getBookmarkedCalls(search);
    setProblems(res);
    if (state.modalDetails.modal) {
      const problemToUpdate = problems.filter(problem => problem.id === state.modalDetails.problem?.id)
      dispatch({
        type: 'CHANGE-MODAL-DETAILS', payload: {
          problem: problemToUpdate[0]
        }
      })
    }
    dispatch({ payload: false, type: 'CHANGE-LOADING' });
  }

  React.useEffect(() => {
    fetch(state.search.search)
  }, [state.modal.modal, state.modalDetails.modal, state.search.search])

  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(problems, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      {problems.length > 0 ?
        <CustomersTable
          reload={fetch}
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
        : null
      }
    </Stack>
  );
}

function applyPagination(rows: Problem[], page: number, rowsPerPage: number): Problem[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
