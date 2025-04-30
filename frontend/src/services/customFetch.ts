import localStorageManager from "../utils/localStorageManager";

const BASE_URL = import.meta.env.VITE_API_HOST;

interface FetchOptions extends Omit<RequestInit, "headers"> {
  skipJsonContentType?: boolean;
  headers?: HeadersInit;
}

async function customFetch<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const token = localStorageManager.getItem("@Auth:token");

  const headers = new Headers(options.headers as HeadersInit);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (
    options.body != null &&
    !options.skipJsonContentType &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(BASE_URL + path, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw data;
  }
  return data;
}

export const api = {
  get: <T = unknown>(url: string) => customFetch<T>(url, { method: "GET" }),
  post: <T = unknown>(url: string, body: unknown) =>
    customFetch<T>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <T = unknown>(url: string, body: unknown) =>
    customFetch<T>(url, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T = unknown>(url: string, body: unknown) =>
    customFetch<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
  del: <T = unknown>(url: string) => customFetch<T>(url, { method: "DELETE" }),
};
