// src/pages/BookDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById, Book } from "@/api/booksApi";
import {
  getReviewsByBook,
  createReview,
  Review,
  CreateReviewPayload,
} from "@/api/reviewsApi";
import { useAuth } from "@/context/AuthContext";
import { API } from "@/api/baseUrl";

const IMAGE_BASE = API.books.replace("/api/books", "");

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const { isAuthenticated } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    setLoading(true);
    Promise.all([getBookById(bookId), getReviewsByBook(bookId)])
      .then(([bookRes, reviewsRes]) => {
        setBook(bookRes);
        setReviews(reviewsRes);
      })
      .catch((err) =>
        setError(err.message || "Error al cargar el detalle del libro")
      )
      .finally(() => setLoading(false));
  }, [bookId]);

  const handleAddToCart = (book: Book) => {
    alert(`🛒 (demo) "${book.title}" agregado al carrito`);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;
    if (!comment.trim()) {
      alert("Escribe un comentario 🙂");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateReviewPayload = {
        bookId,
        rating,
        comment,
      };
      const newReview = await createReview(payload);
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(5);
      alert("✅ Reseña creada con éxito");
    } catch (err: any) {
      alert(err.message || "Error al crear reseña");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando libro...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-danger">
        Error: {error}
      </p>
    );
  if (!book) return <p className="text-center mt-4">Libro no encontrado.</p>;

  return (
    <div className="container py-4">
      {/* Detalle del libro */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          {book.coverUrl && (
            <img
              src={`${IMAGE_BASE}${book.coverUrl}`}
              alt={book.title}
              className="img-fluid rounded"
            />
          )}
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <p className="text-muted">por {book.author}</p>
          {book.description && <p>{book.description}</p>}
          <p className="mb-0">Género: {book.genre || "—"}</p>
          {book.price != null && (
            <p className="fw-bold mt-2">
              Precio: ${book.price.toLocaleString("es-CL")}
            </p>
          )}

          {isAuthenticated && (
            <button
              className="btn btn-success mt-3"
              onClick={() => handleAddToCart(book)}
            >
              Añadir al carrito
            </button>
          )}
        </div>
      </div>

      <hr />

      {/* Reseñas + formulario */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>Reseñas</h4>
          {reviews.length === 0 && <p>No hay reseñas aún.</p>}

          <ul className="list-group">
            {reviews.map((r) => (
              <li key={r.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <strong>{r.rating} ⭐</strong>
                  {r.fechaCreacion && (
                    <small className="text-muted">
                      {new Date(r.fechaCreacion).toLocaleString("es-CL")}
                    </small>
                  )}
                </div>
                <p className="mb-0">{r.comment}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h4>Agregar reseña</h4>

          {!isAuthenticated && (
            <p className="text-muted">
              Debes iniciar sesión para dejar una reseña.
            </p>
          )}

          {isAuthenticated && (
            <form onSubmit={handleCreateReview}>
              <div className="mb-3">
                <label className="form-label">Puntaje (1 a 5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Comentario</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                disabled={submitting}
              >
                {submitting ? "Guardando..." : "Publicar reseña"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
