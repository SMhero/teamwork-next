import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestConfig<D = Record<string, unknown>> extends AxiosRequestConfig<D> {}

const api = axios.create({
  baseURL: "https://inteam.work",
  timeout: 30000,
  timeoutErrorMessage: "The request is timed out...",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error("Unauthorised");
        break;

      case 404:
        console.error("Not Found");
        break;

      case 500:
        console.error("Server Error");
        break;

      default:
        console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  }
);

const getUrlWithPath = (url: string, paths: Record<string, number | string> = {}) => {
  if (paths) {
    Object.keys(paths).forEach(key => {
      url = url.replace(`{{${key}}}`, String(paths[key]));
    });
  }

  return url;
};

export const get = async <R, D>(
  url: string,
  config?: RequestConfig<D>,
  paths?: Record<string, number | string>
): Promise<AxiosResponse<R, D>> => await api.get<R>(getUrlWithPath(url, paths), config);

export const post = async <R, D>(
  url: string,
  data: D,
  config?: RequestConfig<D>,
  paths?: Record<string, number | string>
): Promise<AxiosResponse<R>> => await api.post<R>(getUrlWithPath(url, paths), data, config);
