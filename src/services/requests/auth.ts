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
  const response = await api.post('/user', registerParams);
  return response.data
}
