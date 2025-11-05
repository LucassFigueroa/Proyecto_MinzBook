import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { books } from "@/data/books";
import { useAuth } from "@/context/AuthContext";
import { addReview, deleteReview, listReviews } from "@/data/reviews";
import type { Review } from "@/types";
import { getUsers } from "@/data/users";

export default function BookDetail() {
  const { isbn } = useParams();
  const book = useMemo(() => books.find((b) => b.isbn === isbn), [isbn]);
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reason, setReason] = useState("");

  // obtener lista de usuarios (para mostrar nombre)
  const users = getUsers();

  useEffect(() => {
    if (book) setReviews(listReviews(book.isbn));
  }, [book]);

  if (!book) {
    return (
      <div className="container container-narrow py-3">
        <p>Libro no encontrado.</p>
      </div>
    );
  }

  function handleAdd() {
    if (!user) return alert("Debes iniciar sesión para dejar una reseña.");
    if (!comment.trim()) return alert("Escribe un comentario.");

    const r: Review = {
      id: crypto.randomUUID(),
      bookId: book.isbn,
      userId: user.id,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    addReview(r);
    setReviews(listReviews(book.isbn));
    setComment("");
    setRating(5);
  }

  function handleDelete(id: string) {
    if (!user || user.role !== "admin") return;

    const motivo = prompt("Motivo del borrado:");
    if (!motivo) return;

    const all = listReviews(book.isbn);
    const r = all.find((x) => x.id === id);
    if (r) {
      r.deletedReason = motivo;
      // Guardar reemplazando en localStorage
      deleteReview(id); // primero borra
      addReview(r); // vuelve a agregar con motivo marcado
      setReviews(listReviews(book.isbn));
    }
  }

  return (
    <div className="container container-narrow py-3">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            src={book.image}
            alt={book.title}
            style={{ maxWidth: "420px", width: "100%" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h2>{book.title}</h2>
          <p>
            <b>{book.author}</b> · {book.genre} · ISBN {book.isbn}
          </p>
          <h4>${book.price.toLocaleString()}</h4>
          <p className="fw-bold">{book.description}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-success fw-bold">Añadir al carrito</button>
            <Link to="/catalog" className="btn btn-outline-success fw-bold">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <section>
        <h3 className="mb-3">Reseñas</h3>

        {reviews.length === 0 && (
          <p className="text-muted">Aún no hay reseñas. ¡Sé el primero!</p>
        )}

        <div className="d-flex flex-column gap-2 mb-4">
          {reviews.map((r) => {
            const author = users.find((u) => u.id === r.userId);
            return (
              <div key={r.id} className="card p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-success me-2">{r.rating}★</span>
                    <span>{r.comment}</span>
                    <div className="text-muted small">
                      {author ? author.name : "Usuario desconocido"} –{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                    {r.deletedReason && (
                      <div className="text-danger small mt-1">
                        Eliminada: {r.deletedReason}
                      </div>
                    )}
                  </div>
                  {user?.role === "admin" && !r.deletedReason && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {user ? (
          <div className="card p-3">
            <h5 className="mb-2">Escribe tu reseña</h5>
            <div className="row g-2">
              <div className="col-12 col-md-2">
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-8">
                <input
                  className="form-control"
                  placeholder="¿Qué te pareció?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-2 d-grid">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Publicar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted">Inicia sesión para escribir una reseña.</p>
        )}
      </section>
    </div>
  );
}
