export type RequestPayload = {
  body?: RequestInit["body"];
  headers?: {
    [key: string]: string;
  };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, unknown>;
  queries?: Record<string, string>;
};

const BASE_URL = "http://localhost:8000";

const getUrlWithQueries = (url: string, queries: RequestPayload["queries"] = {}) => {
  const search = new URLSearchParams(queries).toString();
  return `${url}?${decodeURIComponent(search)}`;
};

const getUrlWithParams = (url: string, params: RequestPayload["params"] = {}) => {
  const newUrl = url;

  Object.keys(params).forEach(key => (url = url.replace(`{{${key}}}`, String(params[key]))));
  return newUrl;
};

export const request = async <T>(url: string, payload: RequestPayload = {}): Promise<T> => {
  if (payload.params) {
    url = getUrlWithParams(url, payload.params);
  }

  if (payload.queries) {
    url = getUrlWithQueries(url, payload.queries);
  }

  try {
    const options = {
      ...payload,
      credentials: "include" as RequestInit["credentials"],
      headers: JSON.parse(
        JSON.stringify({
          ...payload.headers,
          "Content-Type": "application/json",
        })
      ),
    };

    const response = url.startsWith("/") ? await fetch(`${BASE_URL}${url}`, options) : await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch error: ${(error as Error)?.message}`);
  }
};
