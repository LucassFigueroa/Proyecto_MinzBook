import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // 👈 importamos los íconos

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (form.password !== form.confirmarPassword)
          return alert("Las contraseñas no coinciden 🔐");

        await register(form.nombre, form.email, form.password);
        alert(`✅ Usuario ${form.nombre} registrado con éxito`);
        navigate("/");
      } else {
        await login(form.email, form.password);
        alert(`👋 Bienvenido, ${form.email}`);
        navigate("/");
      }
    } catch (err: any) {
      alert(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2
        className="text-center mb-4"
        style={{ color: "var(--verde-minzbook)" }}
      >
        {isRegister ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow-sm"
        style={{ backgroundColor: "#fffaf3" }}
      >
        {isRegister && (
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Contraseña</label>
          <div className="input-group">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center"
              onClick={() => setShowPwd(!showPwd)}
              tabIndex={-1}
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {isRegister && (
          <div className="mb-3">
            <label className="form-label fw-bold">Confirmar contraseña</label>
            <div className="input-group">
              <input
                type={showConfirmPwd ? "text" : "password"}
                name="confirmarPassword"
                className="form-control"
                value={form.confirmarPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                tabIndex={-1}
              >
                {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-success w-100 mt-3">
          {isRegister ? "Registrarme" : "Ingresar"}
        </button>
      </form>

      <div className="text-center mt-3">
        {isRegister ? (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button
              className="btn btn-link p-0 fw-bold"
              style={{ color: "var(--verde-minzbook)" }}
              onClick={() => setIsRegister(false)}
            >
              Inicia sesión
            </button>
          </p>
        ) : (
          <p>
            ¿No tienes cuenta?{" "}
            <button
              className="btn btn-link p-0 fw-bold"
              style={{ color: "var(--verde-minzbook)" }}
              onClick={() => setIsRegister(true)}
            >
              Regístrate
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
