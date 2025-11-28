import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { total, clear } = useCart();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    const formatted = parts ? parts.join("-") : "";
    setCardNumber(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(raw);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) raw = raw.slice(0, 2) + "/" + raw.slice(2);
    setExpiry(raw);
  };

  const validate = () => {
    setError(null);
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length !== 16) return "La tarjeta debe tener 16 dígitos.";
    if (cvv.length !== 3) return "El CVV debe tener 3 dígitos.";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return "La fecha debe ser MM/YY.";
    const [mm] = expiry.split("/");
    if (Number(mm) < 1 || Number(mm) > 12) {
      return "El mes de vencimiento no es válido.";
    }
    if (!name.trim()) return "Ingresa el nombre del titular.";
    if (total <= 0) return "El carrito está vacío.";
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      setSuccess(false);
      return;
    }

    clear();
    setSuccess(true);
    setError(null);

    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="container container-narrow py-4">
      <h2 className="mb-3">Pago</h2>
      <p className="text-muted mb-3">
        Monto a pagar: <strong>${total.toLocaleString()}</strong>
      </p>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {success && (
        <div className="alert alert-success py-2">
          Compra realizada con éxito 🎉
        </div>
      )}

      <form className="card p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Número de tarjeta</label>
          <input
            type="text"
            className="form-control"
            placeholder="0000-0000-0000-0000"
            value={cardNumber}
            onChange={handleCardChange}
            maxLength={19}
          />
        </div>

        <div className="row mb-3">
          <div className="col-6 col-md-4">
            <label className="form-label">CVV</label>
            <input
              type="password"
              className="form-control"
              value={cvv}
              onChange={handleCvvChange}
              maxLength={3}
            />
          </div>
          <div className="col-6 col-md-4">
            <label className="form-label">Vencimiento</label>
            <input
              type="text"
              className="form-control"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre del titular</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre y apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/cart")}
          >
            Volver al carrito
          </button>
          <button type="submit" className="btn btn-success fw-bold">
            Pagar
          </button>
        </div>
      </form>
    </div>
  );
}
