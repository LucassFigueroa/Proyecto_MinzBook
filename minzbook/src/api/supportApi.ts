import { API } from "./baseUrl";

export async function createTicket(data: any) {
  const res = await fetch(API.support, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getUserTickets(userId: number) {
  const res = await fetch(`${API.support}/user/${userId}`);
  return res.json();
}

export async function updateTicketStatus(id: number, data: any) {
  const res = await fetch(`${API.support}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
