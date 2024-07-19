import { Startup } from "../../types/problem";
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

export async function createStartup(data: FormData) {
  const response = await api.post('/startup', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function patchStartup(data: Partial<Startup>, id: string) {
  const response = await api.patch('/startup/' + id, data);
  return response;
}
