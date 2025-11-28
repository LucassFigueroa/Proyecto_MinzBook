import { API } from "./baseUrl";

export async function getReviewsByBook(isbn: string) {
  const res = await fetch(`${API.reviews}/book/${isbn}`);
  return res.json();
}

export async function createReview(data: any) {
  const res = await fetch(API.reviews, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateReview(id: number, data: any) {
  const res = await fetch(`${API.reviews}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteReview(id: number, reason: string) {
  await fetch(`${API.reviews}/${id}?reason=${reason}`, {
    method: "DELETE",
  });
}
