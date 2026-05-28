export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function fetcher<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${input}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}
