import React, { useState } from 'react';
import { auth } from '../../services/api';

const CrearCuenta = ({ onBackToLogin }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await auth.register({ nombre_completo: nombre, email, password });
      alert("Cuenta creada exitosamente. Ahora inicia sesión.");
      onBackToLogin();
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
              Crear Cuenta
            </h2>
            <p className="text-secondary">Únete a nuestro sistema de gestión</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <form onSubmit={handleRegistro}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary small">
                Nombre Completo
              </label>
              <input
                type="text"
                className="form-control py-3"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

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
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary small">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control py-3"
                placeholder="Repite tu contraseña"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn w-100 py-3 fw-bold fs-5 border-0 text-white mt-3"
              style={{ backgroundColor: "#001f3f", borderRadius: "8px" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1e293b"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#001f3f"}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Cuenta"}
            </button>
          </form>

          <div className="text-center mt-4 pt-4 border-top">
            <p className="mb-0">
              ¿Ya eres parte del equipo?
              <button
                type="button"
                className="btn btn-link text-warning fw-bold p-0 ms-1"
                onClick={onBackToLogin}
              >
                Inicia Sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
