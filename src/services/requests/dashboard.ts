import { api } from "../api";

export async function getDashboardData() {
  const { data: countUsers } = await api.get('/admin/count-users')
  const { data: countStatusCall } = await api.get('/admin/count-status-calls')
  const { data: countStartups } = await api.get('/admin/count-startups')
  console.log({
    countStatusCall, countUsers, countStartups
  })
  return {
    countStatusCall, countUsers, countStartups
  }
}
