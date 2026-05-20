import { useState, useEffect } from "react";
import AdminDashboard from "./page/Admin/AdminDashboard";
import Login from "./page/Login/Login";
import CrearCuenta from "./page/Login/CrearCuenta";
import Store from "./page/Cliente/Store";
import Cart from "./page/Cliente/Cart";
import { auth } from "./services/api";

function App() {
  const [serverOk, setServerOk] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");

  const [view, setView] = useState("client");
  const [authView, setAuthView] = useState("login");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setServerOk(d.status === "ok"))
      .catch(() => setServerOk(false));
  }, []);

  useEffect(() => {
    if (serverOk !== true) return;
    const token = localStorage.getItem("token");
    if (token) {
      auth.me()
        .then((user) => {
          setIsLoggedIn(true);
          setUserRole(user.rol);
          setUserName(user.nombre_completo);
          const savedView = localStorage.getItem("currentView");
          setView(savedView || (user.rol === "admin" ? "admin" : "client"));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }
  }, [serverOk]);

  const defaultCart = [
    { id: 1, sku: "REF-1020", name: "Amortiguador Delantero", category: "Suspensión", model: "Nissan Versa 2020", price: 1250, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop", quantity: 2 },
    { id: 2, sku: "REF-5040", name: "Pastillas de Freno", category: "Frenos", model: "Nissan March 2018", price: 450, image: "https://images.unsplash.com/photo-acYlVwaXZkY?w=400&h=300&fit=crop", quantity: 1 },
    { id: 8, sku: "REF-9900", name: "Neumático 205/55R16", category: "Llantas", model: "Universal", price: 1650, image: "https://images.unsplash.com/photo-1578844251758-2f71da4c2f9a?w=400&h=300&fit=crop", quantity: 4 },
  ];

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : defaultCart;
    } catch {
      return defaultCart;
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("currentView", view);
    }
  }, [isLoggedIn, view]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (role, user) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(user?.nombre || "");
    setView(role === "admin" ? "admin" : "client");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setAuthView("login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentView");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (sku, mode) => {
    setCart((prev) => {
      if (mode === "all") {
        return prev.filter((item) => item.sku !== sku);
      }
      const existing = prev.find((item) => item.sku === sku);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.sku === sku
            ? { ...item, quantity: item.quantity + (mode === true ? 1 : -1) }
            : item
        );
      }
      return prev.filter((item) => item.sku !== sku);
    });
  };

  const clearCart = () => setCart([]);

  if (serverOk === null) {
    return (
      <div className="d-flex vh-100 w-100 align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}} />
          <p className="text-secondary fs-5">Conectando con el servidor...</p>
        </div>
      </div>
    );
  }

  if (serverOk === false) {
    return (
      <div className="d-flex vh-100 w-100 align-items-center justify-content-center bg-light">
        <div className="text-center px-4" style={{maxWidth: '500px'}}>
          <div className="display-1 mb-3">🔌</div>
          <h2 className="fw-bold mb-2" style={{color: '#001F3F'}}>Servidor no disponible</h2>
          <p className="text-secondary mb-4">
            No se puede conectar con el servidor de la aplicación.
            Asegúrate de que el backend esté corriendo en <strong>http://localhost:4000</strong>
          </p>
          <button className="btn fw-bold px-4 py-2 text-white border-0" style={{backgroundColor: '#001F3F', borderRadius: '8px'}}
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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

          <div className="nav-links" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {userRole !== "admin" && (
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
            )}

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

            {userRole !== "admin" && (
              <div className="position-relative" style={{ cursor: "pointer" }}>
                <span
                  onClick={() => setView("cart")}
                  style={{ fontSize: "1.3rem" }}
                >
                  🛒
                </span>
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{
                      backgroundColor: "#F59E0B",
                      color: "#001F3F",
                      fontSize: "0.65rem",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid #F59E0B",
                borderRadius: "6px",
                color: "#F59E0B",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "0.4rem 1rem",
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
        ) : view === "cart" ? (
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onBackToStore={() => setView("client")}
          />
        ) : (
          <Store onAddToCart={addToCart} />
        )}
      </main>
    </div>
  );
}

export default App;
