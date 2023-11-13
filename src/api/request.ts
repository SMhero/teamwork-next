import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestConfig<D = Record<string, unknown>> extends AxiosRequestConfig<D> {
  paths?: Record<string, number | string>;
}

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 30000,
  timeoutErrorMessage: "The request is time out...",
});

axios.interceptors.response.use(
  result => result,
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
    }

    return Promise.reject(error);
  }
);

const getUrlWithPath = (url: string, paths: RequestConfig["paths"]) => {
  if (paths) {
    Object.keys(paths).forEach(key => {
      url = url.replace(`{{${key}}}`, String(paths[key]));
    });
    return url;
  }

  return url;
};

export const get = async <R, D>(url: string, { paths, ...config }: RequestConfig<D>): Promise<AxiosResponse<R>> => {
  return await instance.get<R>(getUrlWithPath(url, paths), config);
};

export const post = async <R, D>(
  url: string,
  { data, paths, ...config }: RequestConfig<D>
): Promise<AxiosResponse<R>> => {
  return await instance.post<R>(getUrlWithPath(url, paths), { data }, config);
};
