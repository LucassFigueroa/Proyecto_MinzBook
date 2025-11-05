// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";

export default function Home() {
  const heroBook = books[0];   // "El terror de la jungla"
  const featured = books;      // muestra los 4

  return (
    <div className="container container-narrow py-3">
      {/* HERO */}
      <section className="mb-5">
        <div className="row align-items-center g-4">
          {/* Texto */}
          <div className="col-12 col-lg-7">
            <h1 className="display-4 fw-bold mb-2" style={{ color: "var(--color-verde)" }}>
              Bienvenid@ a <br /> MinzBook
            </h1>
            <p className="text-muted mb-3">Tienda de libros.</p>

            <div className="d-flex gap-2">
              <Link to="/catalog" className="btn btn-primary">Ver libros</Link>
              <Link to="/contact" className="btn btn-outline-secondary">Contacto</Link>
            </div>
          </div>

          {/* Imagen controlada */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <img
              src={heroBook.image}              // asegúrate que points a /img/libro1.jpg en /public
              alt={heroBook.title}
              className="hero-img"
              style={{ maxWidth: 480, width: "200%", height: "auto" }} // tope duro anti-estirones
            />
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="h3 m-0" style={{ color: "var(--color-verde)" }}>
          Libros destacados
        </h2>
        <Link to="/catalog" className="btn btn-outline-primary btn-sm">Ver todo</Link>
      </section>

      <section className="row g-3">
        {featured.map((b) => (
          <div key={b.isbn} className="col-12 col-md-6 col-lg-4">
            <BookCard book={b} />
          </div>
        ))}
      </section>
    </div>
  );
}
