// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUser, ensureUsersSeeded, findUserByEmail, verifyPassword } from "@/data/users";
import type { Role, User } from "@/types";

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);
const LS_CURRENT = "mb_current_user";

export function AuthProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    ensureUsersSeeded();
    const raw = localStorage.getItem(LS_CURRENT);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = async (email: string, password: string) => {
    const u = findUserByEmail(email);
    if (!u || !verifyPassword(u, password)) throw new Error("Credenciales inválidas");
    setUser(u);
    localStorage.setItem(LS_CURRENT, JSON.stringify(u));
  };

  const register = async (name: string, email: string, password: string) => {
    const u = createUser(name, email, password, "user");
    setUser(u);
    localStorage.setItem(LS_CURRENT, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_CURRENT);
  };

  const hasRole = (role: Role) => !!user && user.role === role;

  const value = useMemo(() => ({ user, login, logout, register, hasRole }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
