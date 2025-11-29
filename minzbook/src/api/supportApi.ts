import { API } from "./baseUrl";

export interface SupportTicket {
  id: number;
  userId: number;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closingReason?: string;
}

export async function createTicket(
  data: { userId: number; subject: string; message: string },
  token: string
): Promise<SupportTicket> {
  const res = await fetch(API.support, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("No se pudo crear el ticket");
  return res.json();
}

export async function getUserTickets(
  userId: number,
  token: string
): Promise<SupportTicket[]> {
  const res = await fetch(`${API.support}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("No se pudieron obtener los tickets");
  return res.json();
}
