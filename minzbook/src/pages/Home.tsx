// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { loadFromLS } from "@/data/storage";
import type { Review } from "@/types";

const LS_REVIEWS = "mb_reviews";

type TopAuthor = {
  name: string;
  count: number;
};

export default function Home() {
  // Libros destacados (puedes usar slice si quieres solo algunos)
  const featured = books;

  // --- HERO que rota libros ---
  const [heroIndex, setHeroIndex] = useState(0);
  const heroBook = featured[heroIndex] ?? featured[0];

  useEffect(() => {
    if (featured.length <= 1) return;

    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featured.length);
    }, 5000); // cambia cada 5 segundos

    return () => window.clearInterval(id);
  }, [featured.length]);

  // Pre-cargar todas las imágenes del hero
  useEffect(() => {
    featured.forEach((b) => {
      const img = new Image();
      img.src = b.image;
    });
  }, [featured]);

  // --- AUTORES DESTACADOS según reseñas buenas ---
  const [topAuthors, setTopAuthors] = useState<TopAuthor[]>([]);

  useEffect(() => {
    const all = loadFromLS<Review[]>(LS_REVIEWS, []);

    if (!all.length) {
      setTopAuthors([]);
      return;
    }

    const counts: Record<string, number> = {};

    all.forEach((r) => {
      // solo reseñas buenas y no eliminadas
      if (r.rating >= 4 && !r.deletedReason) {
        const book = books.find((b) => b.isbn === r.bookId);
        if (!book) return;
        counts[book.author] = (counts[book.author] || 0) + 1;
      }
    });

    const arr = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // top 3

    setTopAuthors(arr);
  }, []);

  return (
    <div className="container container-narrow py-3">
      {/* HERO */}
      <section className="mb-5">
        <div className="row align-items-center g-4">
          {/* Texto */}
          <div className="col-12 col-lg-7">
            <h1
              className="display-4 fw-bold mb-2"
              style={{ color: "var(--color-verde)" }}
            >
              Bienvenid@ a <br /> MinzBook
            </h1>
            <p className="text-muted mb-3">Tienda de libros.</p>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/catalog" className="btn btn-primary">
                Ver libros
              </Link>
              <Link to="/contact" className="btn btn-outline-secondary">
                Contacto
              </Link>
              <Link to="/author" className="btn btn-outline-success">
                Quiero ser un Autor!
              </Link>
            </div>
          </div>

          {/* Imagen rotando libros destacados con efecto */}
          {heroBook && (
            <div className="col-12 col-lg-5 d-flex justify-content-center">
              <div className="hero-wrapper text-center">
                <img
                  src={heroBook.image}
                  alt={heroBook.title}
                  className="hero-img hero-fade"
                />

                <div className="mt-3">
                  <span className="badge bg-success mb-1">
                    Libro destacado
                  </span>
                  <div className="fw-semibold" style={{ color: "var(--dark)" }}>
                    {heroBook.title}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LIBROS DESTACADOS */}
      <section className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="h3 m-0" style={{ color: "var(--color-verde)" }}>
          Libros destacados
        </h2>
        <Link to="/catalog" className="btn btn-outline-primary btn-sm">
          Ver todo
        </Link>
      </section>

      <section className="row g-3">
        {featured.map((b) => (
          <div key={b.isbn} className="col-12 col-md-6 col-lg-4">
            <BookCard book={b} />
          </div>
        ))}
      </section>

      {/* AUTORES DESTACADOS */}
      {topAuthors.length > 0 && (
        <>
          <hr className="my-5" />

          <section className="mb-3 d-flex align-items-center justify-content-between">
            <h2 className="h3 m-0" style={{ color: "var(--color-verde)" }}>
              Autores destacados
            </h2>
          </section>

          <section className="row g-3">
            {topAuthors.map((a) => (
              <div key={a.name} className="col-12 col-md-4">
                <div className="card h-100 p-3 shadow-sm border-0">
                  <h5 className="mb-1">{a.name}</h5>
                  <p className="text-muted mb-2">
                    {a.count} reseña
                    {a.count === 1 ? "" : "s"} positiva
                  </p>
                  <span className="badge bg-success">Autor destacado</span>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
