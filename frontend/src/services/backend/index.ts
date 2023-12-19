import axios, { AxiosError } from "axios";
import { useToaster } from "../../hooks/useToaster";
import { components } from "./endpoints";

export function useBackend() {
  const { notify } = useToaster();

  const backend = axios.create({
    baseURL: import.meta.env.DEV ? "http://localhost:8000" : undefined,
  });
  backend.interceptors.response.use(
    (_) => _,
    (
      error: AxiosError<
        | components["schemas"]["BadRequestODto"]
        | components["schemas"]["InternalServerErrorODto"]
      >
    ) => {
      error.response && notify(error.response.data.detail, "error");
      return error;
    }
  );
  return { backend };
}
