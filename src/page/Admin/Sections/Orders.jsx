import './Sections.css';

const Orders = () => {
  // Datos de ejemplo para visualizar el diseño
  const ordersData = [
    { id: 'ORD-001', productId: 'REF-9988', productName: 'Balatas Delanteras', clientName: 'Saúl Lorenzo', quantity: 2, price: 850.00 },
    { id: 'ORD-002', productId: 'REF-1020', productName: 'Filtro de Aceite', clientName: 'Juan Pérez', quantity: 1, price: 150.00 },
  ];

  return (
    <div className="admin-card">
      <div className="section-header">
        <h3>Órdenes Realizadas</h3>
        <p className="section-description">Historial de ventas y pedidos de los clientes.</p>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre Producto</th>
              <th>Cliente</th>
              <th className="text-center">Cantidad</th>
              <th>Precio Unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td><span className="sku-badge">{order.productId}</span></td>
                <td>{order.productName}</td>
                <td>{order.clientName}</td>
                <td className="text-center">{order.quantity}</td>
                <td>${order.price.toFixed(2)}</td>
                <td className="font-bold text-navy">${(order.quantity * order.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;