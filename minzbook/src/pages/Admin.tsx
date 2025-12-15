// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Book, deleteBook, getAllBooks } from "@/api/booksApi";
import { User, deleteUser, getAllUsers } from "@/api/authApi";
import {
  Review,
  deleteReview,
  DeleteReviewPayload,
  getAllReviews,
} from "@/api/reviewsApi";
import { SupportTicket, getAllTickets } from "@/api/supportApi";
import { money } from "@/lib/utils";
import { API } from "@/api/baseUrl";

const IMAGE_BASE = API.books.replace("/api/books", "");

type AdminTab = "books" | "users" | "reviews" | "tickets";

export default function AdminPage() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>("books");

  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de error individuales para cada sección
  const [booksError, setBooksError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  // Carga inicial de todos los datos
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);
      setBooksError(null);
      setUsersError(null);
      setReviewsError(null);
      setTicketsError(null);
      
      // Usamos allSettled para que si falla un microservicio, los demás se muestren igual
      const results = await Promise.allSettled([
        getAllBooks(),
        getAllUsers(),
        getAllReviews(),
        getAllTickets(),
      ]);

      const [booksRes, usersRes, reviewsRes, ticketsRes] = results;

      if (booksRes.status === "fulfilled") {
        setBooks(booksRes.value.sort((a, b) => b.id - a.id));
      } else {
        console.error("❌ Error cargando libros:", booksRes.reason);
        setBooksError("Error al cargar libros.");
      }

      if (usersRes.status === "fulfilled") {
        setUsers(usersRes.value.sort((a, b) => b.id - a.id));
      } else {
        console.error("❌ Error cargando usuarios:", usersRes.reason);
        setUsersError(`Error al cargar usuarios: ${usersRes.reason?.message || "Verifica la conexión."}`);
      }

      if (reviewsRes.status === "fulfilled") {
        setReviews(reviewsRes.value.sort((a, b) => b.id - a.id));
      } else {
        console.error("❌ Error cargando reseñas:", reviewsRes.reason);
        setReviewsError(`Error al cargar reseñas: ${reviewsRes.reason?.message || "Verifica la conexión."}`);
      }

      if (ticketsRes.status === "fulfilled") {
        setTickets(ticketsRes.value.sort((a, b) => b.id - a.id));
      } else {
        console.error("❌ Error cargando tickets:", ticketsRes.reason);
        setTicketsError("Error al cargar tickets.");
      }

      // Solo mostramos error global si TODO falló
      if (results.every((r) => r.status === "rejected")) {
        setError("No se pudo conectar con ningún servicio. Verifica que el backend esté corriendo.");
      }

      setLoading(false);
    };

    loadAllData();
  }, []);

  // Handlers para eliminar
  const handleDeleteBook = async (bookId: number) => {
    const reason = prompt("Por favor, ingresa el motivo para eliminar este libro:");
    if (reason === null) return; // Cancelado por el usuario
    if (!reason.trim()) {
      alert("El motivo es obligatorio para eliminar un libro.");
      return;
    }
    if (!window.confirm(`¿Seguro que quieres eliminar el libro ID ${bookId}?\nMotivo: ${reason}`))
      return;
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      alert("Libro eliminado con éxito.");
    } catch (err: any) {
      alert(`Error al eliminar el libro: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (userId === user?.id) {
      alert("No puedes eliminar tu propia cuenta de administrador.");
      return;
    }
    const reason = prompt("Por favor, ingresa el motivo para eliminar este usuario:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("El motivo es obligatorio para eliminar un usuario.");
      return;
    }
    if (!window.confirm(`¿Seguro que quieres eliminar el usuario ID ${userId}?\nMotivo: ${reason}`))
      return;
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert("Usuario eliminado con éxito.");
    } catch (err: any) {
      alert(`Error al eliminar el usuario: ${err.message}`);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    const reason = prompt("Por favor, ingresa el motivo para eliminar esta reseña:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("El motivo es obligatorio para eliminar una reseña.");
      return;
    }
    if (
      !window.confirm(`¿Seguro que quieres eliminar la reseña ID ${reviewId}?`)
    )
      return;
    try {
      const payload: DeleteReviewPayload = { reviewId, reason };
      await deleteReview(payload);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      alert("Reseña eliminada con éxito.");
    } catch (err: any) {
      alert(`Error al eliminar la reseña: ${err.message}`);
    }
  };

  const renderContent = () => {
    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    switch (activeTab) {
      case "books":
        if (booksError) return <div className="alert alert-warning">{booksError}</div>;
        if (books.length === 0) return <p>No hay libros registrados.</p>;

        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Portada</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    {book.coverUrl && (
                      <img
                        src={`${IMAGE_BASE}${book.coverUrl}`}
                        alt={book.title}
                        style={{ width: 50, height: "auto" }}
                      />
                    )}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{money(book.price)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "users":
        if (usersError) return <div className="alert alert-warning">{usersError}</div>;
        if (users.length === 0) return <p>No hay usuarios registrados.</p>;

        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        u.role === "ADMIN"
                          ? "danger"
                          : u.role === "SUPPORT"
                          ? "success"
                          : "secondary"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(u.id)}
                      disabled={u.id === user?.id}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "reviews":
        if (reviewsError) return <div className="alert alert-warning">{reviewsError}</div>;
        if (reviews.length === 0) return <p>No hay reseñas registradas.</p>;

        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Usuario</th>
                <th>Rating</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>
                    {books.find((b) => String(b.id) === review.bookId)?.title ||
                      review.bookId}
                  </td>
                  <td>
                    {users.find((u) => u.id === review.userId)?.name ||
                      review.userId}
                  </td>
                  <td>{"⭐".repeat(review.rating)}</td>
                  <td>{review.comment}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "tickets":
        if (ticketsError) return <div className="alert alert-warning">{ticketsError}</div>;
        if (tickets.length === 0) return <p>No hay tickets de soporte.</p>;

        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asunto</th>
                <th>Usuario ID</th>
                <th>Estado</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.userId}</td>
                  <td>
                    <span className={`badge bg-info`}>{ticket.status}</span>
                  </td>
                  <td>{ticket.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Panel de Administración</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            Libros ({books.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas ({reviews.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => setActiveTab("tickets")}
          >
            Tickets de Soporte ({tickets.length})
          </button>
        </li>
      </ul>

      {renderContent()}
    </div>
  );
}