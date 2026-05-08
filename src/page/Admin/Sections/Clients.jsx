import './Sections.css';
const Clients = () => {
  // Datos de ejemplo (Luego vendrán de tu base de datos MySQL)
  const clientsData = [
    { id: 1, name: 'Saúl Lorenzo Olmos', email: 'saul@example.com' },
    { id: 2, name: 'Juan Pérez', email: 'juan.perez@correo.com' },
    { id: 3, name: 'María García', email: 'm.garcia@automotriz.mx' },
  ];

  return (
    <div className="admin-card">
      <div className="section-header">
        <h3>Control de Clientes</h3>
        <p className="section-description">
          Administra los usuarios registrados en el sistema.
        </p>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td className="text-center">
                  <button className="btn-delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;