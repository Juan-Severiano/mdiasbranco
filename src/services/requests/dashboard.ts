import { api } from "../api";

export async function getDashboardData() {
  const { data: countUsers } = await api.get('/admin/count-users')
  const { data: countStatusCall } = await api.get('/admin/count-status-calls')
  console.log({
    countStatusCall, countUsers
  })
  return {
    countStatusCall, countUsers
  }
}
