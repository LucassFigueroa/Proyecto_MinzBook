import { useState } from "react";
import { createTicket } from "@/api/supportApi";
import { useAuth } from "@/context/AuthContext";

export default function ContactPage() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Por favor completa todos los campos 🙂");
      return;
    }

    if (!isAuthenticated) {
      alert(
        "Debes iniciar sesión para enviar un mensaje al soporte y que quede registrado como ticket."
      );
      return;
    }

    const subject = `Consulta de ${form.name}`;
    const fullMessage =
      `Nombre: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}`;

    try {
      setSending(true);
      await createTicket({
        subject,
        message: fullMessage,
      });

      alert("💌 Tu mensaje fue enviado a soporte y se creó un ticket. ¡Gracias por contactarnos!");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      alert(
        err.message ||
          "Ocurrió un error al enviar tu mensaje. Inténtalo nuevamente en unos minutos."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4" style={{ color: "var(--color-verde)" }}>
        Contáctanos
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#fffaf3" }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold">Tu nombre</label>
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Mensaje</label>
          <textarea
            className="form-control"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>
        </div>

        {!isAuthenticated && (
          <p className="text-muted small mt-2">
            * Debes iniciar sesión para que tu mensaje se registre como ticket
            y el equipo de soporte pueda responderte.
          </p>
        )}

        <button
          type="submit"
          className="btn btn-success w-100 fw-bold mt-3"
          disabled={sending}
        >
          {sending ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}
