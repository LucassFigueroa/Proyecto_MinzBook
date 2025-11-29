import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  const [open, setOpen] = useState(false); // 👈 control del menú

  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        user.name || user.email
      )}&backgroundColor=FDF6EA&textColor=1C3D2E`
    : null;

  const closeMenu = () => setOpen(false); // cierra al hacer click en un link

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          <img src="/img/logo.png" alt="MinzBook" height={28} className="me-2" />
          MinzBook
        </NavLink>

        {/* BOTÓN MOBILE CONTROLADO POR REACT */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENEDOR DEL MENÚ — AHORA CONTROLADO POR "open" */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            <li className="nav-item">
              <NavLink to="/" className="nav-link fw-semibold" onClick={closeMenu}>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/catalog" className="nav-link fw-semibold" onClick={closeMenu}>
                Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/author" className="nav-link fw-semibold" onClick={closeMenu}>
                Autores
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link fw-semibold" onClick={closeMenu}>
                Contacto
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link fw-semibold d-flex align-items-center"
                onClick={closeMenu}
              >
                🛒 Carrito {count > 0 && `(${count})`}
              </NavLink>
            </li>

           {user?.role === "support" && ( 
              <li className="nav-item">
                <NavLink to="/support" className="nav-link fw-semibold" onClick={closeMenu}>
                  Soporte
                </NavLink>
              </li>
            )}

            {/* Área del usuario */}
            <li className="nav-item ms-lg-3">
              {user ? (
                <div className="d-flex align-items-center gap-2">

                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={user.name}
                      className="rounded-circle"
                      style={{
                        width: "28px",
                        height: "28px",
                        objectFit: "cover",
                        border: "2px solid var(--color-verde)",
                      }}
                    />
                  )}

                  <span
                    className="fw-bold"
                    style={{ color: "var(--color-verde)", fontSize: "0.9rem" }}
                  >
                    Hola, {user.name}
                  </span>

                  <button
                    className="btn btn-outline-success btn-sm fw-bold"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/auth"
                  className="btn btn-outline-success btn-sm fw-bold"
                  onClick={closeMenu}
                >
                  Ingresar
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
