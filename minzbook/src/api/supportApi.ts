// src/api/supportApi.ts
import { API } from "./baseUrl";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface SupportTicket {
  id: number;
  userId: number;
  subject: string;
  message: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  subject: string;
  message: string;
}

export interface UpdateTicketStatusPayload {
  id: number;
  status: TicketStatus;
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

async function handleResponse(res: Response) {
  const contentType = res.headers.get("Content-Type") || "";
  const text = await res.text();

  let data: any = null;
  try {
    if (contentType.includes("application/json")) {
      data = JSON.parse(text);
    }
  } catch {
    // ignoramos error de parse
  }

  if (!res.ok) {
    console.error("❌ Support API:", res.status, text);
    if (data?.message) throw new Error(data.message);
    throw new Error(text || `HTTP ${res.status}`);
  }

  return data ?? text;
}

// 🔹 Crear ticket (desde Contact)
// POST /api/support
export async function createTicket(
  payload: CreateTicketPayload
): Promise<SupportTicket> {
  const res = await fetch(`${API.support}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// 🔹 Obtener tickets de un usuario (para "Mis tickets" del cliente)
// GET /api/support/user/{userId}
export async function getMyTickets(
  userId: number
): Promise<SupportTicket[]> {
  const res = await fetch(`${API.support}/user/${userId}`, {
    method: "GET",
    headers: {
      ...authHeaders(),
    },
  });
  return handleResponse(res);
}

// 🔹 Obtener TODOS los tickets (panel de soporte)
// GET /api/support
export async function getAllTickets(): Promise<SupportTicket[]> {
  const res = await fetch(`${API.support}`, {
    method: "GET",
    headers: {
      ...authHeaders(),
    },
  });
  return handleResponse(res);
}

// 🔹 Cambiar estado de un ticket
// PUT /api/support/{id}/status
export async function updateTicketStatus(
  payload: UpdateTicketStatusPayload
): Promise<SupportTicket> {
  const res = await fetch(`${API.support}/${payload.id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ status: payload.status }),
  });

  return handleResponse(res);
}
