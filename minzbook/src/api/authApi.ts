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

async function handleResponse(res: Response) {
  const contentType = res.headers.get("Content-Type") || "";
  const text = await res.text();

  let data: any = null;
  try {
    if (contentType.includes("application/json")) {
      data = JSON.parse(text);
    }
  } catch {}

  if (!res.ok) {
    console.error("❌ Error Auth API:", res.status, text);

    if (data && typeof data.message === "string") {
      throw new Error(data.message);
    }

    throw new Error(text || `Error HTTP ${res.status}`);
  }

  return data !== null ? data : text;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API.auth}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API.auth}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}
