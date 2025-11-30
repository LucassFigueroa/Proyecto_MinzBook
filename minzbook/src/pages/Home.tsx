// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { featuredBooks } from "@/data/books";
import { useCart } from "@/context/CartContext";

// Definimos el tipo para el libro destacado, basado en la estructura de tus datos.
type Book = typeof featuredBooks[0];

export default function Home() {
  const [heroBook, setHeroBook] = useState<Book | null>(null);
  const { add } = useCart();

  // Rotación de libros destacados
  useEffect(() => {
    if (featuredBooks.length === 0) return;

    setHeroBook(featuredBooks[0]);

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % featuredBooks.length;
      setHeroBook(featuredBooks[currentIndex]);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddToCart = (book: Book) => {
    add({
      id: String(book.id),          // 👈 ID numérico del libro
      title: book.title,
      price: book.price ?? 0,
    });

    alert(`🛒 "${book.title}" agregado al carrito`);
  };

  return (
    <div className="container py-4">
      {/* Hero / bienvenida */}
      <section className="mb-5">
        <div
          className="p-4 p-md-5 rounded shadow-sm row align-items-center"
          style={{ backgroundColor: "#fffaf3" }}
        >
          <div className="col-12 col-lg-7">
            <h1 className="mb-3" style={{ color: "var(--verde-minzbook)" }}>
              Bienvenido a MinzBook
            </h1>
            <p className="lead mb-3">
              Explora, descubre y compra libros únicos de autores increíbles.
              Publica tus propias obras o encuentra tu próxima lectura favorita.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/catalog" className="btn btn-success">
                Ver catálogo
              </Link>
              <Link to="/author" className="btn btn-outline-success">
                Publicar un libro
              </Link>
            </div>
          </div>

          {heroBook && (
            <div className="col-12 col-lg-5 d-flex justify-content-center mt-4 mt-lg-0">
              <div className="hero-wrapper text-center">
                <img
                  src={heroBook.image}
                  alt={heroBook.title}
                  className="hero-img hero-fade"
                />
                <div className="mt-3">
                  <span className="badge bg-success mb-1">Libro destacado</span>
                  <div className="fw-semibold" style={{ color: "var(--dark)" }}>
                    {heroBook.title}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Libros destacados */}
      <section className="mb-5">
        <h2 className="mb-3" style={{ color: "var(--verde-minzbook)" }}>
          Libros destacados
        </h2>

        <div className="row g-4">
          {featuredBooks.map((book) => (
            <div className="col-md-4" key={book.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: 260 }}
                />

                <div className="card-body d-flex flex-column">
                  <p className="text-uppercase small text-muted mb-1">
                    {book.author}
                  </p>
                  <h5 className="card-title">{book.title}</h5>
                  <p className="text-muted small mb-2">
                    {book.genre} · ISBN {book.isbn}
                  </p>

                  <p className="card-text small flex-grow-1">
                    {book.description.substring(0, 130)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold">
                      ${book.price.toLocaleString("es-CL")}
                    </span>

                    <div className="d-flex gap-2">
                      {/* 👇 Aquí usamos id, NO isbn */}
                      <Link
                        to={`/books/${book.id}`}
                        className="btn btn-sm btn-outline-success"
                      >
                        Ver
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={() => handleAddToCart(book)}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {featuredBooks.length === 0 && (
            <p className="text-center mt-3">
              No hay libros destacados por el momento.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
