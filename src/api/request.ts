export interface RequestPayload extends RequestInit {
  params?: Record<string, string>;
  queries?: Record<string, string>;
}

const isEmptyPayload = (payload: RequestPayload["queries"] | RequestPayload["params"]) =>
  !(payload && Object.keys(payload).length);

const getUrlWithQueries = (url: string, queries: RequestPayload["queries"] = {}) => {
  if (isEmptyPayload(queries)) {
    return url;
  }

  const search = new URLSearchParams(queries).toString();
  return `${url}?${decodeURIComponent(search)}`;
};

const getUrlWithParams = (url: string, params: RequestPayload["params"] = {}) => {
  if (isEmptyPayload(params)) {
    return url;
  }

  Object.keys(params).forEach(key => (url = url.replace(`{{${key}}}`, params[key])));
  return url;
};

const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, options);

  try {
    const data = await response.text();
    return data ? JSON.parse(data) : {};
  } catch (err) {
    throw new Error(err as string);
  }
};

export const get = <T>(url: string, payload?: RequestPayload): Promise<T> => {
  if (payload?.queries) {
    url = getUrlWithQueries(url, payload?.queries);
  }

  return request<T>(getUrlWithParams(url, payload?.params), payload);
};

export const post = <T>(url: string, payload: RequestPayload): Promise<T> =>
  request(getUrlWithParams(url, payload.params), {
    body: JSON.stringify(payload.body),
    headers: {
      "Content-Type": "application/json",
      ...payload.headers,
    },
    method: "POST",
  });
