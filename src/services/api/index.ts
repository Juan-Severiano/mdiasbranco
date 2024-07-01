import axios from "axios";
import { localClient } from "../../lib/local/client";

const BASE_URL = import.meta.env.VITE_BASE_URL

const { data: user } = localClient.getUser()

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    id: user ? user.id : 1
  }
});
