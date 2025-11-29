import { useEffect, useState } from "react";
import {
  createTicket,
  getMyTickets,
  SupportTicket,
  CreateTicketPayload,
} from "@/api/supportApi";
import { useAuth } from "@/context/AuthContext";

export default function Support() {
  const { isAuthenticated, user } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getMyTickets()
      .then(setTickets)
      .catch((err) => setError(err.message || "Error al cargar tickets"))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      alert("Asunto y mensaje son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateTicketPayload = { subject, message };
      const newTicket = await createTicket(payload);
      setTickets((prev) => [newTicket, ...prev]);
      setSubject("");
      setMessage("");
      alert("✅ Ticket creado con éxito");
    } catch (err: any) {
      alert(err.message || "Error al crear ticket");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <h2>Soporte</h2>
        <p className="text-muted">
          Debes iniciar sesión para ver y crear tickets de soporte.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Soporte</h2>
      <p className="text-muted">Hola {user?.name}, ¿en qué te ayudamos? 🙂</p>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-6 mb-4">
          <h4>Crear nuevo ticket</h4>
          <form onSubmit={handleCreateTicket}>
            <div className="mb-3">
              <label className="form-label">Asunto</label>
              <input
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar ticket"}
            </button>
          </form>
        </div>

        {/* Lista de tickets */}
        <div className="col-md-6">
          <h4>Mis tickets</h4>
          {loading && <p>Cargando tickets...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && tickets.length === 0 && <p>No tienes tickets aún.</p>}

          <ul className="list-group">
            {tickets.map((t) => (
              <li key={t.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <strong>{t.subject}</strong>
                  <span className="badge bg-secondary">{t.status}</span>
                </div>
                <p className="mb-1">{t.message}</p>
                <small className="text-muted">
                  {t.createdAt &&
                    new Date(t.createdAt).toLocaleString("es-CL")}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
