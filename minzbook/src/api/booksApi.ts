import { API } from "./baseUrl";

export async function getAllBooks() {
  const res = await fetch(API.books);
  return res.json();
}

export async function getBookByIsbn(isbn: string) {
  const res = await fetch(`${API.books}/${isbn}`);
  return res.json();
}

export async function searchBooks(q: string) {
  const res = await fetch(`${API.books}/search?q=${q}`);
  return res.json();
}

export async function createBook(data: any) {
  const res = await fetch(API.books, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function uploadImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API.upload}/image`, {
    method: "POST",
    body: fd,
  });

  return res.text();
}
