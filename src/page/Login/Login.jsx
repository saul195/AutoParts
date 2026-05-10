import React, { useState } from "react";
import "../Login/Login.css";

const Login = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de prueba
    if (email === "saulo0507@hotmail.com" && password === "1") {
      onLogin("admin"); // Entra como Admin
    } else if (email === "somlozneroluas@gmail.com" && password === "2") {
      onLogin("client"); // Entra como Cliente
    } else {
      alert("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-visual">
        <div className="visual-overlay">
          <h1>AUTOPARTS</h1>
          <p>Potencia y precisión en cada refacción.</p>
        </div>
      </div>

      <div className="login-form-container">
        <div className="login-card-split">
          <div className="login-header">
            <h2>Bienvenido</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          <form className="form-stack" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary-login">
              Iniciar Sesión
            </button>
          </form>

          <div className="register-footer">
            <p>
              ¿Aún no tienes una cuenta?
              <button
                type="button"
                className="btn-link"
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
