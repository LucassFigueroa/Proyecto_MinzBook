import { API } from "./baseUrl";

export interface Review {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
  comment: string;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateReviewPayload {
  bookId: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewPayload {
  id: number;
  rating?: number;
  comment?: string;
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
    console.error("❌ Review API:", res.status, text);
    if (data?.message) throw new Error(data.message);
    throw new Error(text || `HTTP ${res.status}`);
  }

  return data ?? text;
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

// GET /api/reviews/book/{id}
export async function getReviewsByBook(bookId: number): Promise<Review[]> {
  const res = await fetch(`${API.reviews}/book/${bookId}`, {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// POST /api/reviews
export async function createReview(payload: CreateReviewPayload): Promise<Review> {
  const res = await fetch(`${API.reviews}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUT /api/reviews/{id}
export async function updateReview(payload: UpdateReviewPayload): Promise<Review> {
  const { id, ...body } = payload;
  const res = await fetch(`${API.reviews}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

// DELETE /api/reviews/{id}
export async function deleteReview(id: number): Promise<void> {
  const res = await fetch(`${API.reviews}/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  await handleResponse(res);
}
