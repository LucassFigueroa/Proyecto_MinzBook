import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  response?: string;
}

// 📦 Función que carga los mensajes guardados en localStorage
function loadMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem("contactMessages");
    const parsed = raw ? (JSON.parse(raw) as ContactMessage[]) : [];
    // Ordenar del más nuevo al más antiguo
    return parsed.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export default function SupportPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [responses, setResponses] = useState<{ [id: string]: string }>({});

  // 🔁 Cargar mensajes al montar y actualizar si cambia el localStorage
  useEffect(() => {
    const load = () => setMessages(loadMessages());
    load(); // primera carga

    window.addEventListener("focus", load);
    window.addEventListener("storage", load);

    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  // 📨 Enviar respuesta
  const handleResponse = (id: string) => {
    const text = responses[id]?.trim();
    if (!text) return alert("Por favor escribe una respuesta 💬");

    const updated = messages.map((m) =>
      m.id === id ? { ...m, response: text } : m
    );
    setMessages(updated);
    localStorage.setItem("contactMessages", JSON.stringify(updated));
    alert("✅ Respuesta guardada correctamente");
  };

  // 🔒 Solo visible si el usuario es soporte
  console.log("Usuario actual:", user);
  if (!user || user.email?.toLowerCase() !== "soporte@minzbook.cl") {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-muted">🚫 No tienes permiso para acceder a esta página.</h4>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0" style={{ color: "var(--color-verde)" }}>
          Bandeja de Soporte 💬
        </h2>
        <span className="badge text-bg-success">{messages.length} mensajes</span>
      </div>

      {messages.length === 0 ? (
        <div className="alert alert-warning text-center">
          No hay mensajes recibidos desde el formulario de Contacto.
        </div>
      ) : (
        <div className="list-group">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="list-group-item mb-3 shadow-sm"
              style={{ backgroundColor: "#fffaf3" }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1">
                    <strong>📩 De:</strong> {msg.name} ({msg.email})
                  </p>
                  <p className="text-muted small mb-2">
                    <strong>🕒</strong> {msg.date}
                  </p>
                </div>
                <span
                  className={`badge ${
                    msg.response ? "text-bg-success" : "text-bg-secondary"
                  }`}
                >
                  {msg.response ? "Respondido" : "Pendiente"}
                </span>
              </div>

              <p className="mb-2">
                <strong>💬 Mensaje:</strong> {msg.message}
              </p>

              {msg.response ? (
                <div className="mt-2 p-2 border rounded bg-light">
                  <strong>✅ Respuesta enviada:</strong>
                  <p className="mb-0">{msg.response}</p>
                </div>
              ) : (
                <div className="mt-3">
                  <textarea
                    className="form-control mb-2"
                    rows={2}
                    placeholder="Escribe tu respuesta..."
                    value={responses[msg.id] || ""}
                    onChange={(e) =>
                      setResponses({ ...responses, [msg.id]: e.target.value })
                    }
                  />
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm fw-bold"
                      onClick={() => handleResponse(msg.id)}
                    >
                      Enviar respuesta
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        setResponses((prev) => ({ ...prev, [msg.id]: "" }))
                      }
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
