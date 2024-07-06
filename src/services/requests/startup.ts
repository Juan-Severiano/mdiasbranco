import { api } from "../api";

export async function getStartups() {
  const response = await api.get('/startup')
  return response.data
}

export async function getStartupById(id: string) {
  const response = await api.get(`/startup/${id}`)
  return response.data
}

export async function deleteStartup(id: string) {
  const response = await api.delete(`/startup/${id}`)
  return response.data
}