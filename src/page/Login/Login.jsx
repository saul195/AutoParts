import React, { useState } from "react";
import { auth } from "../../services/api";

const Login = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await auth.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user.rol, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 w-100 overflow-hidden">
      <div
        className="col-lg-6 d-none d-lg-flex"
        style={{
          background: `url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat`,
        }}
      >
        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-5"
          style={{ background: "rgba(0, 31, 63, 0.65)" }}
        >
          <h1 className="display-1 fw-black text-uppercase mb-0 text-white">
            AUTOPARTS
          </h1>
          <p className="fs-4 fw-bold text-warning mt-4">
            Potencia y precisión en cada refacción.
          </p>
        </div>
      </div>

      <div className="col-lg-6 d-flex align-items-center justify-content-center vh-100 p-4 bg-light">
        <div className="w-100" style={{ maxWidth: "420px" }}>
          <div className="mb-4">
            <h2 className="fw-bold" style={{ color: "#001f3f", fontSize: "2.5rem" }}>
              Bienvenido
            </h2>
            <p className="text-secondary">Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary small">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control py-3"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary small">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control py-3"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn w-100 py-3 fw-bold fs-5 border-0 text-white mt-3"
              style={{ backgroundColor: "#001f3f", borderRadius: "8px" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1e293b"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#001f3f"}
              disabled={loading}
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="d-flex align-items-center gap-2 my-3">
            <hr className="flex-grow-1 m-0" />
            <span className="text-secondary small">O CONTINÚA CON</span>
            <hr className="flex-grow-1 m-0" />
          </div>

          <div className="d-flex gap-3 mb-3">
            <button
              type="button"
              className="btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 border"
              style={{ borderRadius: "8px", backgroundColor: "white" }}
              onClick={() => alert("Demo: Inicio de sesión con Google")}
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
              Google
            </button>
            <button
              type="button"
              className="btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 text-white border-0"
              style={{ backgroundColor: "#1877F2", borderRadius: "8px" }}
              onClick={() => alert("Demo: Inicio de sesión con Facebook")}
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="white" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#1877F2" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="white" d="M26.6 24H22.5V20H24.6V17C24.6 14.9 25.8 13 28.8 13c1.3 0 2.3.1 2.3.1l-.1 3.1s-1.1 0-2.3 0c-1.3 0-1.5.6-1.5 1.5V20h3.8l-.2 4H27.2v12h-4.7V24z"/></svg>
              Facebook
            </button>
          </div>

          <div className="text-center pt-3 border-top">
            <p className="mb-0">
              ¿Aún no tienes una cuenta?
              <button
                type="button"
                className="btn btn-link text-warning fw-bold p-0 ms-1"
                onClick={onGoToRegister}
              >
                Crear cuenta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
