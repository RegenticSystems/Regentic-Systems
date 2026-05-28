import { useAuthStore } from "@/store/useAuthStore";
import { API_URL }      from "./api";

export async function login(email: string, password: string) {
  const res  = await fetch(`${API_URL}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  useAuthStore.getState().setUser(data.user, data.accessToken);
  return data;
}

export function signOut() { useAuthStore.getState().clear(); }
