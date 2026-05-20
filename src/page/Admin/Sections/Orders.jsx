const Orders = () => {
  const ordersData = [
    { id: 'ORD-001', productId: 'REF-9988', productName: 'Balatas Delanteras', clientName: 'Saúl Lorenzo', quantity: 2, price: 850.00 },
    { id: 'ORD-002', productId: 'REF-1020', productName: 'Filtro de Aceite', clientName: 'Juan Pérez', quantity: 1, price: 150.00 },
  ];

  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Órdenes Realizadas
          </h3>
          <p className="text-secondary small mb-0">
            Historial de ventas y pedidos de los clientes.
          </p>
        </div>

        <div className="table-responsive rounded border">
          <table className="table table-hover mb-0 align-middle">
            <thead className="text-white small text-uppercase" style={{ backgroundColor: '#001F3F' }}>
              <tr>
                <th className="px-3 py-3 fw-semibold">ID Producto</th>
                <th className="px-3 py-3 fw-semibold">Nombre Producto</th>
                <th className="px-3 py-3 fw-semibold">Cliente</th>
                <th className="px-3 py-3 fw-semibold text-center">Cantidad</th>
                <th className="px-3 py-3 fw-semibold">Precio Unit.</th>
                <th className="px-3 py-3 fw-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 py-3">
                    <span className="badge bg-light text-dark border font-monospace">
                      {order.productId}
                    </span>
                  </td>
                  <td className="px-3 py-3">{order.productName}</td>
                  <td className="px-3 py-3">{order.clientName}</td>
                  <td className="px-3 py-3 text-center">{order.quantity}</td>
                  <td className="px-3 py-3">${order.price.toFixed(2)}</td>
                  <td className="px-3 py-3 fw-bold" style={{ color: '#001F3F' }}>
                    ${(order.quantity * order.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
