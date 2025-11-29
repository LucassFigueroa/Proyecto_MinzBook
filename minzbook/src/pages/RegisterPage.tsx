import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      // Aquí construimos el objeto con los datos del formulario.
      // Las claves (name, email, password) coinciden con lo que el backend espera.
      await register({ name, email, password });
      navigate("/"); // Redirige al inicio o al catálogo después del registro exitoso
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "Ocurrió un error durante el registro. Inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container container-narrow py-5">
      <h1 className="text-center mb-4">Crear una cuenta</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              {isLoading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}