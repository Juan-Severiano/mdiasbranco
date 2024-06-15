import { api } from "../api";

export async function getStartups() {
  const response = await api.get('/startup')
  return response.data
}
