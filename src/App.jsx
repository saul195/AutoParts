import { useState, useEffect } from "react";
import AdminDashboard from "./page/Admin/AdminDashboard";
import Login from "./page/Login/Login";
import CrearCuenta from "./page/Login/CrearCuenta";
import Store from "./page/Cliente/Store";

function App() {
  // 1. Inicializamos los estados leyendo desde localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  const [view, setView] = useState(() => {
    return localStorage.getItem("userRole") === "admin" ? "admin" : "client";
  });

  const [authView, setAuthView] = useState("login");

  // 2. Cada vez que cambie el estado de login o el rol, lo guardamos
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setView(role === "admin" ? "admin" : "client");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setAuthView("login");
    localStorage.clear(); // Limpiamos todo al salir
  };

  // --- FLUJO DE AUTENTICACIÓN ---
  if (!isLoggedIn) {
    return authView === "login" ? (
      <Login
        onLogin={handleLogin}
        onGoToRegister={() => setAuthView("register")}
      />
    ) : (
      <CrearCuenta onBackToLogin={() => setAuthView("login")} />
    );
  }

  // --- FLUJO DE APLICACIÓN LOGUEADA ---
  return (
    <div
      className="app-container"
      style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}
    >
      <nav
        className="navbar"
        style={{ backgroundColor: "#001F3F", color: "white", padding: "1rem" }}
      >
        <div
          className="navbar-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            className="logo"
            onClick={() => setView("client")}
            style={{ cursor: "pointer", margin: 0 }}
          >
            AUTO<span style={{ color: "#F59E0B" }}>PARTS</span>
          </h1>

          <div className="nav-links" style={{ display: "flex", gap: "1.5rem" }}>
            <button
              onClick={() => setView("client")}
              style={{
                background: "none",
                border: "none",
                color: view === "client" ? "#F59E0B" : "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Tienda
            </button>

            {userRole === "admin" && (
              <button
                onClick={() => setView("admin")}
                style={{
                  background: "none",
                  border: "none",
                  color: view === "admin" ? "#F59E0B" : "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Panel Admin
              </button>
            )}

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#F59E0B",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main>
        {view === "admin" && userRole === "admin" ? (
          <AdminDashboard />
        ) : (
          <Store />
        )}
      </main>
    </div>
  );
}

export default App;
