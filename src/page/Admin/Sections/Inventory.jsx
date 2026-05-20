const Inventory = () => {
  const inventoryData = [
    { id: 'REF-1020', desc: 'Filtro de Aceite', cat: 'Motor', model: 'Nissan March 2020', supplier: 'Refaccionaria Norte', stock: 15, status: 'Activo' },
    { id: 'REF-9988', desc: 'Balatas Delanteras', cat: 'Frenos', model: 'VW Jetta 2018', supplier: 'Frenos S.A.', stock: 8, status: 'Inactivo' },
    { id: 'REF-5544', desc: 'Amortiguador Trasero', cat: 'Suspensión', model: 'Toyota Hilux 2022', supplier: 'Surtidora Automotriz', stock: 4, status: 'Activo' }
  ];

  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Inventario de Refacciones
          </h3>
          <p className="text-secondary small mb-0">
            Consulta y gestiona el estado de tus productos disponibles.
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-4">
          <div className="flex-grow-1">
            <input type="text" placeholder="🔍 Buscar por SKU o nombre..." className="form-control" />
          </div>
          <div className="d-flex gap-2">
            <select className="form-select">
              <option value="">Todas las Categorías</option>
              <option value="frenos">Frenos</option>
              <option value="motor">Motor</option>
              <option value="suspension">Suspensión</option>
            </select>
            <select className="form-select">
              <option value="">Todos los Modelos</option>
              <option value="nissan">Nissan March 2020</option>
              <option value="vw">VW Jetta 2018</option>
              <option value="toyota">Toyota Hilux 2022</option>
            </select>
          </div>
        </div>

        <div className="table-responsive rounded border">
          <table className="table table-hover mb-0 align-middle">
            <thead className="text-white small text-uppercase" style={{ backgroundColor: '#001F3F' }}>
              <tr>
                <th className="px-3 py-3 fw-semibold">ID / SKU</th>
                <th className="px-3 py-3 fw-semibold">Descripción</th>
                <th className="px-3 py-3 fw-semibold">Categoría</th>
                <th className="px-3 py-3 fw-semibold">Modelo (Auto)</th>
                <th className="px-3 py-3 fw-semibold text-center">Estado</th>
                <th className="px-3 py-3 fw-semibold text-center">Existencia</th>
                <th className="px-3 py-3 fw-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 py-3">
                    <span className="badge bg-light text-dark border font-monospace">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-3 py-3">{item.desc}</td>
                  <td className="px-3 py-3">{item.cat}</td>
                  <td className="px-3 py-3">{item.model}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`badge rounded-pill fw-bold text-uppercase ${item.status === 'Activo' ? 'bg-success-subtle text-success-emphasis' : 'bg-danger-subtle text-danger-emphasis'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center fw-bold" style={{ color: '#001F3F' }}>
                    {item.stock} pzas
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="btn btn-outline-dark btn-sm"
                      style={{ borderColor: '#001F3F', color: '#001F3F' }}
                      onMouseEnter={(e) => { e.target.style.background = '#001F3F'; e.target.style.color = 'white'; }}
                      onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#001F3F'; }}
                    >
                      Cambiar Estado
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

export default Inventory;
