import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  // Generar avatar automático (iniciales) si el usuario está logeado
  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        user.name || user.email
      )}&backgroundColor=FDF6EA&textColor=1C3D2E`
    : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        {/* LOGO */}
        <NavLink className="navbar-brand fw-bold" to="/">
          <img
            src="/img/logo.png"
            alt="MinzBook"
            height={28}
            className="me-2"
          />
          MinzBook
        </NavLink>

        {/* Toggle móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú principal */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <NavLink to="/" className="nav-link fw-semibold">
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/catalog" className="nav-link fw-semibold">
                Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/author" className="nav-link fw-semibold">
                Autores
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link fw-semibold">
                Contacto
              </NavLink>
            </li>

            {/* Visible solo para el usuario de soporte */}
            {user?.role === "support" && (
              <li className="nav-item">
                <NavLink to="/support" className="nav-link fw-semibold">
                  Soporte
                </NavLink>
              </li>
            )}

            {/* Usuario autenticado o no */}
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
                    style={{
                      color: "var(--color-verde)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Hola, {user.name}
                  </span>

                  <button
                    className="btn btn-outline-success btn-sm fw-bold"
                    onClick={logout}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/auth"
                  className="btn btn-outline-success btn-sm fw-bold"
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
