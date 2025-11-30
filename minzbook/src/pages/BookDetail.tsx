// src/pages/BookDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById, Book } from "@/api/booksApi";
import {
  getReviewsByBook,
  createReview,
  Review,
  deleteReview,
  DeleteReviewPayload,
  CreateReviewPayload,
} from "@/api/reviewsApi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { API } from "@/api/baseUrl";

const IMAGE_BASE = API.books.replace("/api/books", "");

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();

  // id crudo de la URL (string) → para reviews
  const bookIdStr = id ?? "";

  // id numérico → para catalogservice
  const bookIdNum = id ? Number(id) : NaN;

  const { isAuthenticated, user } = useAuth();
  const { add } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // si no hay id en la URL, no hacemos nada
    if (!id) {
      setError("ID de libro no válido en la URL.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      // Ejecutamos ambas peticiones en paralelo para mejorar la velocidad de carga
      // y asegurar que una no bloquee a la otra si falla.
      const [bookResult, reviewsResult] = await Promise.allSettled([
        // 1) Cargar libro (catalogservice)
        Number.isNaN(bookIdNum)
          ? Promise.reject(new Error("ID de libro inválido (no numérico)."))
          : getBookById(bookIdNum),
        // 2) Cargar reseñas (reviewservice)
        getReviewsByBook(bookIdStr),
      ]);

      if (cancelled) return;

      // Procesar resultado del libro
      if (bookResult.status === "fulfilled") {
        setBook(bookResult.value);
      } else {
        console.error("Error al cargar libro:", bookResult.reason);
        setError(
          bookResult.reason?.message || "Error al cargar el detalle del libro"
        );
      }

      // Procesar resultado de las reseñas
      if (reviewsResult.status === "fulfilled") {
        setReviews(reviewsResult.value);
        console.log(
          "%c[DEBUG] Pidiendo reseñas a:",
          "color: green; font-weight: bold;",
          `${API.reviews}/book/${bookIdStr}`
        );
      } else {
        console.error("Error al cargar reseñas:", reviewsResult.reason);
        // Si solo fallan las reseñas, no mostramos un error global,
        // simplemente no se verán en la UI.
        setReviews([]);
      }

      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, bookIdNum, bookIdStr]);

  const handleAddToCart = (book: Book) => {
    if (!book.id) {
      alert("Este libro no tiene un ID válido para el carrito.");
      return;
    }

    add({
      id: String(book.id),
      title: book.title,
      price: book.price ?? 0,
    });

    alert(`🛒 "${book.title}" agregado al carrito`);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookIdStr) return;

    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para dejar una reseña.");
      return;
    }

    if (!comment.trim()) {
      alert("Escribe un comentario antes de enviar la reseña.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateReviewPayload = {
        bookId: bookIdStr, // String en backend
        userId: user.id,   // Long en backend
        rating,
        comment,
      };

      const newReview = await createReview(payload);
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(5);
      alert(" Reseña creada con éxito");
    } catch (err: any) {
      console.error("Error al crear reseña:", err);
      alert(err.message || "Error al crear reseña");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    const reason = prompt(
      "Por favor, ingresa el motivo para eliminar esta reseña:"
    );

    if (!reason || reason.trim() === "") {
      alert("Debes proporcionar un motivo para eliminar la reseña.");
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar esta reseña?\nMotivo: ${reason}`)) {
      return;
    }

    try {
      const payload: DeleteReviewPayload = { reviewId, reason };
      const updatedReview = await deleteReview(payload);

      // Actualizamos la reseña en el estado local para que refleje el cambio
      // (se marcará como inactiva y desaparecerá de la lista visible).
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? updatedReview : r))
      );
      alert(" Reseña eliminada correctamente.");
    } catch (err: any) {
      console.error("Error al eliminar reseña:", err);
      alert(err.message || "No se pudo eliminar la reseña.");
    }
  };

  const isAdmin = user?.email === "admin@minzbook.cl";

  if (loading) return <p className="text-center mt-4">Cargando libro...</p>;

  // si hubo error con el libro, lo mostramos (pero igual pudo intentar reviews)
  if (error && !book)
    return (
      <p className="text-center mt-4 text-danger">
        Error: {error}
      </p>
    );

  if (!book) return <p className="text-center mt-4">Libro no encontrado.</p>;

  const visibleReviews = reviews.filter((r) => r.active);

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
          {visibleReviews.length === 0 && <p>No hay reseñas aún.</p>}

          <ul className="list-group">
            {visibleReviews.map((r) => (
              <li key={r.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{r.rating} ⭐</strong>
                    {r.createdAt && (
                      <small className="text-muted ms-2">
                        {new Date(r.createdAt).toLocaleString("es-CL")}
                      </small>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      title="Eliminar reseña"
                      onClick={() => handleDeleteReview(r.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <p className="mb-0">{r.comment}</p>
                {!r.active && r.deletedReason && (
                  <small className="text-muted d-block">
                    Inactiva: {r.deletedReason}
                  </small>
                )}
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
