import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Startup } from '../../../types/problem';
import { StartupTable } from '../../../components/startup/table-list';
import { CallFilters } from '../../../components/startup/filter';
import { getStartups } from '../../../services/requests/startup';
import { StartupGrid } from '../../../components/startup/table-grid';
import NotFoundItem from '../../(errors)/not-found-item';

export default function ManagerStartup() {
  const [startups, setStartups] = React.useState<Startup[]>([])
  const [toogleRender, setToogleRender] = React.useState<'list' | 'grid'>('list');

  React.useEffect(() => {
    const get = async () => {
      const res = await getStartups()
      setStartups(res)
    }
    get()
  }, [])

  const page = 0;
  const rowsPerPage = 10;

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
              rowsPerPage={rowsPerPage} reload={function (): Promise<void> {
                throw new Error('Function not implemented.');
              }} />
          ) : (
            <StartupTable
              count={startups.length}
              page={page}
              rows={startups}
              rowsPerPage={rowsPerPage} />
          )) : <NotFoundItem message='Nenhuma startup aqui ainda' />
      }
    </Stack>
  );
}
