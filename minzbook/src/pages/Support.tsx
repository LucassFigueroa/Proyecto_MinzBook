// src/pages/Support.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getAllTickets,
  updateTicketStatus,
  SupportTicket,
  TicketStatus,
} from "@/api/supportApi";

type ViewStatusFilter = "ALL" | TicketStatus;

export default function Support() {
  const { user, isAuthenticated } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  const [changingStatus, setChangingStatus] = useState(false);
  const [filter, setFilter] = useState<ViewStatusFilter>("ALL");

  // Cargar lista de tickets al entrar
  useEffect(() => {
    if (!isAuthenticated) {
      setLoadingTickets(false);
      return;
    }

    async function loadTickets() {
      try {
        setLoadingTickets(true);
        setTicketsError(null);
        const data = await getAllTickets();
        setTickets(data);
      } catch (err: any) {
        setTicketsError(
          err.message || "Error al cargar tickets de soporte."
        );
      } finally {
        setLoadingTickets(false);
      }
    }

    loadTickets();
  }, [isAuthenticated]);

  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const filteredTickets =
    filter === "ALL"
      ? tickets
      : tickets.filter((t) => t.status === filter);

  const handleChangeStatus = async (newStatus: TicketStatus) => {
    if (!selectedTicket) return;

    if (
      !confirm(
        `¿Seguro que quieres marcar el ticket #${selectedTicket.id} como ${newStatus}?`
      )
    ) {
      return;
    }

    try {
      setChangingStatus(true);
      const updated = await updateTicketStatus({
        id: selectedTicket.id,
        status: newStatus,
      });

      // Actualizar en la lista
      setTickets((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
      // Actualizar el seleccionado
      setSelectedTicket(updated);
    } catch (err: any) {
      alert(err.message || "Error al actualizar el estado del ticket.");
    } finally {
      setChangingStatus(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <h2>Panel de Soporte</h2>
        <p className="text-muted">
          Debes iniciar sesión como usuario de soporte para ver los tickets.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-1">Panel de Soporte</h2>
      <p className="text-muted mb-4">
        Hola {user?.name}, aquí puedes gestionar los tickets enviados desde
        Contacto. 💬
      </p>

      <div className="row">
        {/* LISTA DE TICKETS */}
        <div className="col-md-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">Tickets</h4>
            <select
              className="form-select form-select-sm"
              style={{ maxWidth: 180 }}
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ViewStatusFilter)
              }
            >
              <option value="ALL">Todos</option>
              <option value="OPEN">Abiertos</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="RESOLVED">Resueltos</option>
              <option value="CLOSED">Cerrados</option>
            </select>
          </div>

          {loadingTickets && <p>Cargando tickets...</p>}
          {ticketsError && (
            <p className="text-danger">Error: {ticketsError}</p>
          )}
          {!loadingTickets && filteredTickets.length === 0 && (
            <p>No hay tickets para mostrar.</p>
          )}

          <ul className="list-group">
            {filteredTickets.map((t) => (
              <li
                key={t.id}
                className={`list-group-item ${
                  selectedTicket?.id === t.id ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectTicket(t)}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{t.subject}</strong>
                    <br />
                    <small className="text-muted">
                      Usuario #{t.userId}
                    </small>
                  </div>
                  <span className="badge bg-secondary">{t.status}</span>
                </div>
                <small className="text-muted">
                  {t.createdAt &&
                    new Date(t.createdAt).toLocaleString("es-CL")}
                </small>
              </li>
            ))}
          </ul>
        </div>

        {/* DETALLE DEL TICKET */}
        <div className="col-md-8">
          {selectedTicket ? (
            <>
              <div className="mb-3">
                <h4>
                  Ticket #{selectedTicket.id} — {selectedTicket.subject}
                </h4>
                <p className="mb-1">
                  <strong>Usuario:</strong> ID {selectedTicket.userId}
                </p>
                <p className="mb-1">
                  <strong>Estado:</strong>{" "}
                  <span className="badge bg-secondary">
                    {selectedTicket.status}
                  </span>
                </p>
                <small className="text-muted">
                  Creado:{" "}
                  {new Date(selectedTicket.createdAt).toLocaleString(
                    "es-CL"
                  )}
                </small>
              </div>

              <div className="border rounded p-3 mb-3">
                <p className="mb-0">
                  <strong>Mensaje inicial:</strong>
                </p>
                <p>{selectedTicket.message}</p>
              </div>

              {/* ACCIONES DE ESTADO */}
              <div className="d-flex gap-2">
                {selectedTicket.status !== "IN_PROGRESS" && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={changingStatus}
                    onClick={() => handleChangeStatus("IN_PROGRESS")}
                  >
                    Marcar en progreso
                  </button>
                )}

                {selectedTicket.status !== "RESOLVED" && (
                  <button
                    className="btn btn-outline-success btn-sm"
                    disabled={changingStatus}
                    onClick={() => handleChangeStatus("RESOLVED")}
                  >
                    Marcar como resuelto
                  </button>
                )}

                {selectedTicket.status !== "CLOSED" && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={changingStatus}
                    onClick={() => handleChangeStatus("CLOSED")}
                  >
                    Cerrar ticket
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-muted">
              Selecciona un ticket en la lista para ver los detalles y cambiar
              su estado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
