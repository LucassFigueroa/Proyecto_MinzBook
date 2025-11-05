import { useState } from "react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  response?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage: ContactMessage = {
      id: crypto.randomUUID(),
      ...form,
      date: new Date().toLocaleString(),
    };

    // 💾 Guarda en localStorage en la misma clave que lee soporte
    const existing = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    localStorage.setItem("contactMessages", JSON.stringify([...existing, newMessage]));

    alert("💌 Tu mensaje fue enviado con éxito. ¡Gracias por contactarnos!");
    setForm({ name: "", email: "", message: "" });
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

        <button type="submit" className="btn btn-success w-100 fw-bold mt-3">
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}
