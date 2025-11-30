// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Role } from "@/types/role";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: Role;
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Si no está autenticado → login
  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location }}
      />
    );
  }

  // Si la ruta exige rol → verificar
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
