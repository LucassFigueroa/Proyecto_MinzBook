import { API } from "./baseUrl";

export interface Review {
  id: number;
  bookId: string;      // isbn
  userId: number;
  rating: number;
  comment: string;
  active: boolean;
  deletedReason?: string;
  createdAt: string;
}

export async function getReviewsByBook(isbn: string): Promise<Review[]> {
  const res = await fetch(`${API.reviews}/book/${isbn}`);
  if (!res.ok) throw new Error("No se pudieron cargar las reseñas");
  return res.json();
}

export async function createReview(
  data: { bookId: string; userId: number; rating: number; comment: string },
  token: string
): Promise<Review> {
  const res = await fetch(API.reviews, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("No se pudo crear la reseña");
  return res.json();
}
