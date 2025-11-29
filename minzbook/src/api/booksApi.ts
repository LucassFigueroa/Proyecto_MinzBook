// src/api/booksApi.ts
import { API } from "./baseUrl";

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  coverUrl?: string;        // ej: "/images/17329_portada.jpg"
  postedByUserId?: number;
}

export interface CreateBookPayload {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  coverUrl?: string;
  postedByUserId?: number;
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
    // ignorar error de parseo
  }

  if (!res.ok) {
    console.error(" Books API:", res.status, text);
    if (data?.message) throw new Error(data.message);
    throw new Error(text || `HTTP ${res.status}`);
  }

  // si es texto plano (como /api/upload/image) devolvemos el string
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

// GET /api/books
export async function getAllBooks(): Promise<Book[]> {
  const res = await fetch(`${API.books}`, {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// GET /api/books/{id}
export async function getBookById(id: number): Promise<Book> {
  const res = await fetch(`${API.books}/${id}`, {
    method: "GET",
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

// POST /api/upload/image -> devuelve "/images/xxxx.jpg"
export async function uploadBookCover(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API.upload}/image`, {
    method: "POST",
    body: formData, // sin Content-Type, el navegador lo pone
  });

  // el controlador devuelve ResponseEntity<String> con la URL pública
  const coverUrl = await handleResponse(res);
  return coverUrl as string;
}

// POST /api/books
export async function createBook(
  payload: CreateBookPayload
): Promise<Book> {
  const res = await fetch(`${API.books}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}
