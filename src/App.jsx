import { useState, useEffect } from "react";
import AdminDashboard from "./page/Admin/AdminDashboard";
import Login from "./page/Login/Login";
import CrearCuenta from "./page/Login/CrearCuenta";
import Store from "./page/Cliente/Store";
import Cart from "./page/Cliente/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  const [view, setView] = useState(() => {
    const saved = localStorage.getItem("currentView");
    if (saved) return saved;
    return localStorage.getItem("userRole") === "admin" ? "admin" : "client";
  });

  const [authView, setAuthView] = useState("login");

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
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("currentView", view);
  }, [isLoggedIn, userRole, view]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setView(role === "admin" ? "admin" : "client");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setAuthView("login");
    localStorage.clear();
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
