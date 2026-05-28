"use client";
import { useAuthStore } from "@/store/useAuthStore";

export function Header() {
  const { user, clear } = useAuthStore();
  return (
    <header className="border-b bg-white px-4 py-3 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight">Synapse ERP</div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm hidden md:inline">{user.firstName} {user.lastName}</span>
            <button onClick={clear} className="text-sm text-red-600 hover:underline">Sign out</button>
          </>
        ) : (
          <a href="/login" className="text-sm hover:underline">Sign in</a>
        )}
      </div>
    </header>
  );
}
