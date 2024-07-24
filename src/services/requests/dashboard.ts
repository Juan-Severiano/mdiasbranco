import { api } from "../api";

export async function getDashboardData() {
  const { data: countUsers } = await api.get('/admin/count-users')
  const { data: countStatusCall } = await api.get('/admin/count-status-calls')
  // const { data: countStartups } = await api.get('/admin/count-startups')
  const { data: graphData } = await api.get('/admin/calls-by-sector')
  const { data: ranking } = await api.get('/startup/rank/finished-calls')
  console.log({
    countStatusCall, countUsers, graphData
  })
  return {
    countStatusCall, countUsers, graphData, ranking
  }
}
