import * as React from 'react';
import Stack from '@mui/material/Stack';
import { CustomersTable } from '../../../components/call/table-list';
import { Problem } from '../../../types/problem';
import { getBookmarkedCalls } from '../../../services/requests/call';
import { useCustomContext } from '../../../contexts/context';
import NotFoundItem from '../../(errors)/not-found-item';

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

  return (
    <Stack spacing={3}>
      {problems?.length > 0 ?
        <CustomersTable
          reload={fetch}
          count={problems.length}
          page={page}
          rows={problems}
          rowsPerPage={rowsPerPage}
        />
        : <NotFoundItem message='Você ainda não tem chamados salvos' />
      }
    </Stack>
  );
}

