import React from 'react';
import '../Login/Login.css';

const CrearCuenta = ({ onBackToLogin }) => {
  
  const handleRegistro = (e) => {
    e.preventDefault();
    // Lógica para procesar el registro
    console.log("Datos enviados para registro");
    onBackToLogin(); // Regresa al login tras el registro exitoso
  };

  return (
    <div className="login-screen">
      {/* Lado Izquierdo: Imagen de Marca (50%) */}
      <div className="login-visual">
        <div className="visual-overlay">
          <h1>AUTOPARTS</h1>
          <p>Potencia y precisión en cada refacción.</p>
        </div>
      </div>

      {/* Lado Derecho: Formulario (50%) */}
      <div className="login-form-container">
        <div className="login-card-split">
          <div className="login-header">
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestro sistema de gestión</p>
          </div>

          <form className="form-stack" onSubmit={handleRegistro}>
            {/* Campo: Nombre */}
            <div className="form-group">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            {/* Campo: Correo */}
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                placeholder="Crea una contraseña"
                required
              />
            </div>

            {/* Campo: Confirmar Contraseña */}
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input 
                type="password" 
                placeholder="Repite tu contraseña"
                required
              />
            </div>

            {/* Botón de Acción Principal */}
            <button type="submit" className="btn-primary-login">
              Registrar Cuenta
            </button>
          </form>

          {/* Opción para volver al Login */}
          <div className="register-footer">
            <p>
              ¿Ya eres parte del equipo? 
              <button 
                type="button" 
                className="btn-link" 
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