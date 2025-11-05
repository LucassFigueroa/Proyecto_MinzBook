import { useEffect, useMemo, useState } from "react";
import { books as baseBooks } from "@/data/books";
import BookCard from "@/components/BookCard";

type CustomBook = {
  title: string;
  author: string;
  description: string;
  price: number;
  cover?: string;   // guardado desde Author.tsx
  image?: string;   // normalizaremos a esto para BookCard
  isbn: string;
  genre?: string;
};

function loadCustomBooks(): CustomBook[] {
  try {
    const raw = localStorage.getItem("customBooks");
    const parsed = raw ? (JSON.parse(raw) as CustomBook[]) : [];
    // Normaliza a { image } para que BookCard pueda pintar la portada
    return parsed.map((b) => ({
      ...b,
      image: b.cover || b.image || "/img/placeholder-cover.jpg",
    }));
  } catch {
    return [];
  }
}

export default function Catalog() {
  const [custom, setCustom] = useState<CustomBook[]>(() => loadCustomBooks());

  // Recarga cuando cambia localStorage (otra pestaña) o cuando la pestaña vuelve al foco
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "customBooks") setCustom(loadCustomBooks());
    };
    const onFocus = () => setCustom(loadCustomBooks());

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Une base + custom (los custom primero para ver lo recién publicado arriba)
  const allBooks = useMemo(() => {
    return [...custom, ...baseBooks];
  }, [custom]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0" style={{ color: "var(--color-verde)" }}>
          Catálogo
        </h2>
        <small className="text-muted">{allBooks.length} libros</small>
      </div>

      {allBooks.length === 0 ? (
        <div className="alert alert-warning">
          Aún no hay libros en el catálogo. Publica uno desde <b>Autores</b>.
        </div>
      ) : (
        <div className="row g-3">
          {allBooks.map((book) => (
            <div key={book.isbn} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              
              <BookCard book={book as any} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
