// src/api/reviewsApi.ts
import { API } from "./baseUrl";

export interface Review {
  id: number;
  bookId: string;       // en tu DTO era String
  userId: number;
  rating: number;
  comment: string;
  active: boolean;
  deletedReason?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateReviewPayload {
  bookId: string;  // String en backend
  userId: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewPayload {
  id: number;
  rating?: number;
  comment?: string;
  active?: boolean;
  deletedReason?: string | null;
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

async function handleResponse<T = any>(res: Response): Promise<T> {
  const contentType = res.headers.get("Content-Type") || "";
  const text = await res.text();

  let data: any = null;
  try {
    if (contentType.includes("application/json")) {
      data = JSON.parse(text);
    }
  } catch {
    // ignore parse error
  }

  if (!res.ok) {
    console.error(" Reviews API:", res.status, text);
    if (data?.message) throw new Error(data.message);
    throw new Error(text || `HTTP ${res.status}`);
  }

  return (data ?? text) as T;
}

/**
 * GET /api/reviews/book/{bookId}
 * Obtiene todas las reseñas activas o no para un libro
 */
export async function getReviewsByBook(bookId: string): Promise<Review[]> {
  const res = await fetch(`${API.reviews}/book/${bookId}`, {
    method: "GET",
    headers: {
      ...authHeaders(),
    },
  });

  return handleResponse<Review[]>(res);
}

/**
 * GET /api/reviews
 * Obtiene TODAS las reseñas (para el panel de admin)
 */
export async function getAllReviews(): Promise<Review[]> {
  const res = await fetch(`${API.reviews}`, {
    method: "GET",
    headers: {
      ...authHeaders(),
    },
  });
  return handleResponse<Review[]>(res);
}

/**
 * POST /api/reviews
 * Crea una nueva reseña
 */
export async function createReview(
  payload: CreateReviewPayload
): Promise<Review> {
  const res = await fetch(`${API.reviews}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Review>(res);
}

/**
 * PUT /api/reviews/{id}
 * Actualiza una reseña existente (opcional, por si lo usas después)
 */
export async function updateReview(
  id: number,
  payload: UpdateReviewPayload
): Promise<Review> {
  const res = await fetch(`${API.reviews}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Review>(res);
}

export interface DeleteReviewPayload {
  reviewId: number;
  reason: string;
}

/**
 * DELETE /api/reviews/{id}
 * Marca la reseña como inactiva o la borra (según backend)
 */
export async function deleteReview(
  payload: DeleteReviewPayload
): Promise<Review> {
  const res = await fetch(`${API.reviews}/${payload.reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ reason: payload.reason }),
  });

  return handleResponse<Review>(res);
}
