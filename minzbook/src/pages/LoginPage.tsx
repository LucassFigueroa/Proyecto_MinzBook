import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      // SOLUCIÓN: Creamos un objeto con email y password, que es lo que el backend espera.
      await login({ email, password });
      navigate("/"); // Redirige a la página principal tras un login exitoso
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Email o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container container-narrow py-5">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}