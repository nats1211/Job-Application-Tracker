import { Application, NewApplicationInput } from "Types/applications";

const BASE_URL = "/";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${res.status}`);
  }
  // 204 No Content has no body to parse
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function fetchApplications(): Promise<Application[]> {
  const res = await fetch(BASE_URL);
  return handleResponse<Application[]>(res);
}

export async function createApplicationRequest(
  input: NewApplicationInput,
): Promise<Application> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Application>(res);
}

export async function updateApplicationRequest(
  app: Application,
): Promise<Application> {
  const res = await fetch(`${BASE_URL}/${app.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(app),
  });
  return handleResponse<Application>(res);
}

export async function deleteApplicationRequest(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse<void>(res);
}
