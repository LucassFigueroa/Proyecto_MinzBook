// src/pages/Catalog.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks, Book } from "@/api/booksApi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { API } from "@/api/baseUrl";

const IMAGE_BASE = API.books.replace("/api/books", ""); // http://localhost:8087

export default function Catalog() {
  const { isAuthenticated } = useAuth();
  const { add } = useCart();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllBooks()
      .then(setBooks)
      .catch((err) =>
        setError(err.message || "Error al cargar el catálogo de libros")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (book: Book) => {
    add({
      id: String(book.id),
      title: book.title,
      price: book.price ?? 0,
    });

    alert(`🛒 "${book.title}" agregado al carrito`);
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando catálogo...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-4 text-danger">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: "var(--verde-minzbook)" }}>
        Catálogo de libros
      </h2>

      <div className="row g-3">
        {books.map((book) => (
          <div className="col-md-4" key={book.id}>
            <div className="card h-100">
              {book.coverUrl && (
                <img
                  src={`${IMAGE_BASE}${book.coverUrl}`}
                  className="card-img-top"
                  alt={book.title}
                  style={{ objectFit: "cover", height: 200 }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <p className="text-uppercase small text-muted mb-1">
                  {book.author}
                </p>
                <h5 className="card-title">{book.title}</h5>

                {book.description && (
                  <p className="card-text small mt-2">
                    {book.description.substring(0, 120)}...
                  </p>
                )}

                <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
                  <Link
                    to={`/books/${book.id}`}
                    className="btn btn-sm btn-outline-success"
                  >
                    Ver detalle
                  </Link>

                  {book.price != null && (
                    <span className="fw-bold">
                      ${book.price.toLocaleString("es-CL")}
                    </span>
                  )}
                </div>

                {isAuthenticated && (
                  <button
                    className="btn btn-success btn-sm w-100 mt-2"
                    onClick={() => handleAddToCart(book)}
                  >
                    Añadir al carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <p className="text-center">No hay libros disponibles.</p>
        )}
      </div>
    </div>
  );
}
