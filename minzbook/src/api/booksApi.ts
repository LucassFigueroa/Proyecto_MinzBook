import { API } from "./baseUrl";

export interface Book {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverUrl: string;     // del backend
  description: string;
  postedByUserId: number;
}

// Tipo que usa tu UI (book.image)
export interface UiBook {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  image: string;
  description: string;
  postedByUserId: number;
}

function mapToUi(b: Book): UiBook {
  return {
    ...b,
    image: b.coverUrl, // tu frontend usa "image"
  };
}

export async function getAllBooks(): Promise<UiBook[]> {
  const res = await fetch(API.books);
  const data: Book[] = await res.json();
  return data.map(mapToUi);
}

export async function getBookByIsbn(isbn: string): Promise<UiBook> {
  const res = await fetch(`${API.books}/${isbn}`);
  const data: Book = await res.json();
  return mapToUi(data);
}

export async function createBook(data: {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  coverUrl: string;
  description: string;
  postedByUserId: number;
}, token: string) {
  const res = await fetch(API.books, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el libro");
  }

  const created: Book = await res.json();
  return mapToUi(created);
}

// upload imagen al microservicio
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API.upload}/image`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error("Error al subir imagen");
  }

  // el backend responde algo tipo "/images/xxx.jpg"
  const url = await res.text();
  return url;
}
