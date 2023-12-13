import axios, { AxiosInstance } from "axios";

export const backend: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:8000" : undefined,
});
