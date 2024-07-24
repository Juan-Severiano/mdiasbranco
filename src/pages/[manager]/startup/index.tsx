import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Startup } from '../../../types/problem';
import { StartupTable } from '../../../components/startup/table-list';
import { CallFilters } from '../../../components/startup/filter';
import { getStartups } from '../../../services/requests/startup';
import { StartupGrid } from '../../../components/startup/table-grid';
import NotFoundItem from '../../(errors)/not-found-item';
import { Pagination } from '@mui/material';

export default function ManagerStartup() {
  const [startups, setStartups] = React.useState<Startup[]>([])
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');
  const [page, setPage] = React.useState(1);
  const [totalProblems, setTotalProblems] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const get = async () => {
    const res = await getStartups(page, rowsPerPage)
    setStartups(res.data)
    setTotalProblems(res.total)
  }

  React.useEffect(() => {
    get()
  }, [page])

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Stack spacing={3}>
      <CallFilters
        setToogleRender={setToogleRender}
        toogleRender={toogleRender} setSearchKeyword={function (_: React.SetStateAction<string>): void {

        }} setSelectedDate={function (_: React.SetStateAction<string>): void {

        }} setSelectedPriority={function (_: React.SetStateAction<string>): void {

        }} setSelectedStatus={function (_: React.SetStateAction<string>): void {

        }} />
      {
        startups.length > 0 ? (
          toogleRender === 'grid' ? (
            <StartupGrid
              count={startups.length}
              page={page}
              rows={startups}
              rowsPerPage={rowsPerPage} reload={get} />
          ) : (
            <StartupTable
              reload={get}
              count={startups.length}
              page={page}
              rows={startups}
              rowsPerPage={rowsPerPage} />
          )) : <NotFoundItem message='Nenhuma startup aqui ainda' />
      }
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
