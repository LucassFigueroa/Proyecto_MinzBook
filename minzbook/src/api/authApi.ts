import { API } from "./baseUrl";

export type Role = "USER" | "SUPPORT" | "ADMIN";

export interface AuthResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

async function handleResponse<T = any>(res: Response): Promise<T> {
  const contentType = res.headers.get("Content-Type") || "";
  const text = await res.text();

  let data: any = null;
  try {
    // Evitar parsear JSON si el texto está vacío (ej. en respuestas 204 No Content)
    if (contentType.includes("application/json") && text) {
      data = JSON.parse(text);
    }
  } catch {
    // ignorar error de parseo
  }

  if (!res.ok) {
    console.error("❌ Error Auth API:", res.status, text);

    if (data?.message) throw new Error(data.message);

    throw new Error(text || `Error HTTP ${res.status}`);
  }

  return (data !== null ? data : text) as T;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<AuthResponse>(res);
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API.auth}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<AuthResponse>(res);
}

function authHeaders(): HeadersInit {
  try {
    const raw = localStorage.getItem("mb_auth");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed.token) return {};
    return { Authorization: `Bearer ${parsed.token}` };
  } catch {
    return {};
  }
}

export async function getAllUsers(): Promise<User[]> {
  // Usamos la ruta definida en AuthController (/api/auth/users)
  const res = await fetch(`${API.auth}/users`, {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handleResponse<User[]>(res);
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API.auth}/users/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });
  await handleResponse(res);
}
