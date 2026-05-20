const Clients = () => {
  const clientsData = [
    { id: 1, name: 'Saúl Lorenzo Olmos', email: 'saul@example.com' },
    { id: 2, name: 'Juan Pérez', email: 'juan.perez@correo.com' },
    { id: 3, name: 'María García', email: 'm.garcia@automotriz.mx' },
  ];

  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Control de Clientes
          </h3>
          <p className="text-secondary small mb-0">
            Administra los usuarios registrados en el sistema.
          </p>
        </div>
        <div className="table-responsive rounded border">
          <table className="table table-hover mb-0 align-middle">
            <thead className="text-white small text-uppercase" style={{ backgroundColor: '#001F3F' }}>
              <tr>
                <th className="px-3 py-3 fw-semibold">Nombre Completo</th>
                <th className="px-3 py-3 fw-semibold">Correo Electrónico</th>
                <th className="px-3 py-3 fw-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client) => (
                <tr key={client.id}>
                  <td className="px-3 py-3">{client.name}</td>
                  <td className="px-3 py-3">{client.email}</td>
                  <td className="px-3 py-3 text-center">
                    <button className="btn btn-danger btn-sm fw-semibold">
                      Eliminar
                    </button>
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

export default Clients;
