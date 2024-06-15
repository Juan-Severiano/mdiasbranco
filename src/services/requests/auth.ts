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
