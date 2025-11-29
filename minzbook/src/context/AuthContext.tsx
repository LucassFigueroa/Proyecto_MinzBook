import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  login as apiLogin,
  register as apiRegister,
  Role,
} from "@/api/authApi";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LS_KEY = "mb_auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { user: AuthUser; token: string };
      setUser(parsed.user);
      setToken(parsed.token);
    } catch {
      // ignore
    }
  }, []);

  const persist = (data: { user: AuthUser | null; token: string | null }) => {
    setUser(data.user);
    setToken(data.token);

    if (data.user && data.token) {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  };

  const handleAuthResponse = (res: AuthResponse) => {
    const authUser: AuthUser = {
      id: res.id,
      name: res.name,
      email: res.email,
      role: res.role,
    };
    persist({ user: authUser, token: res.token });
  };

  const login = async (payload: LoginPayload) => {
    const res = await apiLogin(payload);
    handleAuthResponse(res);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await apiRegister(payload);
    handleAuthResponse(res);
  };

  const logout = () => {
    persist({ user: null, token: null });
  };

  const hasRole = (role: Role) => user?.role === role;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
