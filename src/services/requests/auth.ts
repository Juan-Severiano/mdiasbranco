import { localClient } from "../../lib/local/client";
import { Sector } from "../../types/problem";
import { LoginParams, RegisterUser } from "../../types/user";
import { api } from "../api";

export async function loginRequest(loginParams: LoginParams) {
  const response = await api.post('/auth/login', loginParams);
  return response.data
}

export async function forgetPasswordSolicitation({ email }: { email: string }) {
  const response = await api.post('/auth/recover-password', { email });
  return response.data
}

export async function registerRequest(registerParams: RegisterUser) {
  const formData = new FormData();
  formData.append('name', registerParams.name);
  formData.append('mat', registerParams.mat);
  formData.append('telphone', registerParams.telphone);
  formData.append('password', registerParams.password);
  formData.append('email', registerParams.email);
  formData.append('sector', registerParams.sector);
  formData.append('image', registerParams.files[0]);
  console.log(registerParams.files[0])
  console.log(formData)
  const response = await api.post('/user', formData);
  return response.data
}

export async function updateUserImage(file: File) {
  const formData = new FormData();
  const { data } = localClient.getUser();
  formData.append('file', file);
  console.log(formData)
  const response = await api.patch(`/user/attachment/${data?.image_id.path}`, formData);
  console.log(response)
  localClient.addUser({
    ...data,
    image_id: {
      id: data?.image_id.id,
      path: file.name
    }
  })
  return response.data
}

export async function patchUser(registerParams: Partial<Omit<RegisterUser, 'files'>>, id: number) {
  const newData: Partial<Omit<RegisterUser, 'files'>> = {};

  function isValidSector(value: any): value is Sector {
    return Object.values(Sector).includes(value);
  }

  Object.keys(registerParams).forEach(key => {
    const value = registerParams[key as keyof typeof registerParams];
    if (value !== undefined) {
      if (key === 'sector') {
        if (isValidSector(value)) {
          newData[key as 'sector'] = value;
        }
      } else {
        newData[key as keyof typeof newData] = value as any;
      }
    }
  });

  const response = await api.patch(`/user/${id}`, newData);
  return response.data;
}

export async function getUserById(id: string) {
  const response = await api.get(`/user/${id}`)
  return response.data
}
