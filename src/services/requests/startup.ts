import { Startup } from "../../types/problem";
import { api } from "../api";

export const getStartups = async (page: number = 1, limit: number = 10) => {
  const response = await api.get('/startup', {
    params: {
      page, limit
    }
  })
  return await response.data;
};

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

export async function getStartupDetails(id: number): Promise<StartupDetails> {
  try {
    const res = await api.get(`/admin/startup/${id}/count-finished-calls`)
    const position = await api.get<{ result: number }>(`/startup/rank/finished-calls/${id}`)
    console.log(res)
    return {
      finished_calls: res.data.result ?? 0,
      position: position.data.result ?? 0,
    }
  } catch (error) {
    throw error
  }
}

export interface StartupDetails {
  position: number
  finished_calls: number
}
