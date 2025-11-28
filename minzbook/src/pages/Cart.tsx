import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, setQty, remove, total } = useCart();
  const navigate = useNavigate(); // 👈 NECESARIO PARA NAVEGAR

  return (
    <div className="container container-narrow py-3">
      <h1 style={{ color: "var(--dark)" }}>Carrito</h1>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5}>Tu carrito está vacío.</td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id}>
                  <td className="fw-bold">{it.title}</td>
                  <td>${it.price.toLocaleString()}</td>
                  <td style={{ maxWidth: 120 }}>
                    <input
                      className="form-control"
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) =>
                        setQty(it.id, Math.max(1, Number(e.target.value) || 1))
                      }
                    />
                  </td>
                  <td>${(it.price * it.qty).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => remove(it.id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Total
              </td>
              <td className="fw-bold">${total.toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2 mt-3">
        <Link
          to="/catalog"
          className="btn btn-outline-success fw-bold seguir-comprando-btn"
        >
          Seguir comprando
        </Link>

        {/* 👇 ESTE ES EL BOTÓN NUEVO FUNCIONAL */}
        <button
          className="btn btn-success fw-bold ir-a-pagar-btn"
          onClick={() => navigate("/checkout")}
        >
          Ir a pagar
        </button>
      </div>

      <div className="footer mt-5">
        <span>© 2025 MinzBook</span>
        <span>Hecho por Lucas y Matias :3 🪴</span>
      </div>
    </div>
  );
}
