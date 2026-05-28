import { create } from "zustand";

interface User { id: string; email: string; firstName: string; lastName: string; tenantId: string; }
interface AuthState {
  token:    string | null;
  user:     User   | null;
  tenantId: string | null;
  setUser:  (user: User, token: string) => void;
  clear:    () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token:    null,
  user:     null,
  tenantId: null,
  setUser:  (user, token) => set({ token, user, tenantId: user.tenantId }),
  clear:    () => set({ token: null, user: null, tenantId: null }),
}));
