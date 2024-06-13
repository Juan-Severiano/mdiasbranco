import { isAxiosError } from 'axios';
import { CreateProblem } from '../../types/problem';
import { localClient } from '../../lib/local/client';
import { api } from '../api';

export async function createCall(data: CreateProblem) {
  const { data: user } = localClient.getUser();
  
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('sector', data.sector);
  formData.append('user_id', String(user.id));
  
  if (data.files) {
    data.files.forEach((file) => {
      formData.append('attachment', file);
    });
  }

  try {
    const response = await api.post('/call', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return isAxiosError(err) ? err : err;
  }
}

export async function getCalls() {
  try {
    const response = await api.get('/call')
    console.log(response.data)
    return response.data
  } catch(err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}

export async function deleteCall(id: number) {
  try {
    const response = await api.delete(`/call/${id}`)
    console.log(response.data)
    return response.data
  } catch(err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}
