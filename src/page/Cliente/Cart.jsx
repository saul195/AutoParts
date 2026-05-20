const Cart = ({ cart, onRemoveFromCart, onClearCart, onBackToStore }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-4" style={{ fontSize: "4rem" }}>🛒</div>
        <h3 className="fw-bold mb-3" style={{ color: "#001F3F" }}>
          Tu carrito está vacío
        </h3>
        <p className="text-secondary mb-4">
          Agrega productos desde la tienda para empezar.
        </p>
        <button
          className="btn fw-bold px-4 py-2 border-0 text-white"
          style={{ backgroundColor: "#001F3F" }}
          onClick={onBackToStore}
        >
          Seguir Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bolder mb-0" style={{ color: "#001F3F", fontSize: "1.8rem" }}>
          Tu Carrito
        </h2>
        <button
          className="btn btn-outline-danger btn-sm fw-semibold"
          onClick={onClearCart}
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="table-responsive rounded border">
        <table className="table table-hover mb-0 align-middle">
          <thead className="text-white small text-uppercase" style={{ backgroundColor: "#001F3F" }}>
            <tr>
              <th className="px-3 py-3 fw-semibold" style={{ width: "80px" }}></th>
              <th className="px-3 py-3 fw-semibold">Producto</th>
              <th className="px-3 py-3 fw-semibold text-center">Precio</th>
              <th className="px-3 py-3 fw-semibold text-center">Cantidad</th>
              <th className="px-3 py-3 fw-semibold text-center">Subtotal</th>
              <th className="px-3 py-3 fw-semibold text-center"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.sku}>
                <td className="px-3 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                    onError={(e) => { e.target.style.display = "none" }}
                  />
                </td>
                <td className="px-3 py-2">
                  <div className="fw-semibold small">{item.name}</div>
                  <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                    {item.sku}
                  </div>
                </td>
                <td className="px-3 py-2 text-center">${item.price}</td>
                <td className="px-3 py-2 text-center">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary border-0 fw-bold"
                      style={{ color: "#001F3F" }}
                      onClick={() => onRemoveFromCart(item.sku)}
                    >
                      −
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary border-0 fw-bold"
                      style={{ color: "#001F3F" }}
                      onClick={() =>
                        onRemoveFromCart(item.sku, true)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2 text-center fw-bold" style={{ color: "#001F3F" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    className="btn btn-sm btn-outline-danger border-0"
                    onClick={() => onRemoveFromCart(item.sku, "all")}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <div
          className="p-4 rounded shadow-sm"
          style={{ minWidth: "320px", backgroundColor: "#f8fafc" }}
        >
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Subtotal:</span>
            <span className="fw-bold">${total.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-secondary">Envío:</span>
            <span className="fw-bold" style={{ color: "#F59E0B" }}>
              GRATIS
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <span className="fs-5 fw-bold" style={{ color: "#001F3F" }}>
              Total:
            </span>
            <span className="fs-5 fw-bold" style={{ color: "#001F3F" }}>
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            className="btn fw-bold py-3 w-100 border-0 shadow-sm"
            style={{
              backgroundColor: "#FFC439",
              color: "#001F3F",
              fontSize: "1.1rem",
              cursor: "not-allowed",
            }}
            disabled
          >
            <span className="fw-bolder" style={{ fontFamily: "Arial, sans-serif", letterSpacing: "1px", fontSize: "1.2rem" }}>
              PayPal
            </span>{" "}
            — Pagar ${total.toFixed(2)} ⚡
          </button>
          <p className="text-center text-secondary small mb-0 mt-2">
            El botón de PayPal no está operativo — modo demostración
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn fw-bold px-4 py-2 border-0 text-white"
          style={{ backgroundColor: "#001F3F" }}
          onClick={onBackToStore}
        >
          ← Seguir Comprando
        </button>
      </div>
    </div>
  );
};

export default Cart;
