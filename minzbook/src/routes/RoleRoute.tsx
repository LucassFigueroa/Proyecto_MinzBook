import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/api/authApi";
import { JSX } from "react";

export default function RoleRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: Role;
}) {
  const { hasRole } = useAuth();
  return hasRole(role) ? children : <Navigate to="/" />;
}
