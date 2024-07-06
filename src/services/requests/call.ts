import { isAxiosError } from 'axios';
import { CreateProblem, Problem } from '../../types/problem';
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
  const response = await api.post('/call', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function getCalls(search?: string) {
  try {
    const response = await api.get('/call', {
      params: {
        search: search
      }
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}

export async function getBookmarkedCalls(search?: string) {
  try {
    const response = await api.get('/user/save/key_points', {
      params: {
        search: search
      }
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}

export async function deleteCall(id: number) {
  try {
    const response = await api.delete(`/call/${id}`)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}

export async function getCallByID(id: number) {
  try {
    const response = await api.get(`/call/${id}`)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
    return isAxiosError(err) ? err : err
  }
}


export async function updateCallPartial(partialCall:Partial<Problem>, id: number) {
  const response = await api.patch(`/call/${id}/`, partialCall)
  return response.data
}

interface CreateComment {
  user: number
  call: number
  message: string
  problem: string
}

export async function createComment(comment: CreateComment) {
  const response = await api.post('/comment', comment)
  return response.data
}

export async function saveCallByKeyPoint(user_id: string, call_id: string, key_point: string) {
  const response = await api.post('/user/save/key_points', {
    user_id, call_id, key_point, note: ''
  })
  return response.data
}

export async function deleteCallByKeyPoint(user_id: string, call_id: string) {
  console.log(`/user/save/key_points/?user_id=${user_id}&call_id=${call_id}`)
  const response = await api.delete(`/user/save/key_points/${user_id}/${call_id}`)
  return response.data
}
