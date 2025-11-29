import { useEffect, useState } from "react";
import { getAllBooks, UiBook } from "@/api/booksApi";
import BookCard from "@/components/BookCard";

export default function Catalog() {
  const [books, setBooks] = useState<UiBook[]>([]);

  useEffect(() => {
    getAllBooks().then(setBooks).catch(console.error);
  }, []);

  return (
    <div className="container container-narrow py-3">
      <h1 style={{ color: "var(--color-verde)" }}>Catálogo</h1>
      <div className="row g-3 mt-2">
        {books.map((b) => (
          <div key={b.isbn} className="col-12 col-md-6 col-lg-4">
            <BookCard book={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
