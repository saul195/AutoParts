import './Sections.css';

const Inventory = () => {
  // Datos de ejemplo con la nueva propiedad 'status'
  const inventoryData = [
    { id: 'REF-1020', desc: 'Filtro de Aceite', cat: 'Motor', model: 'Nissan March 2020', supplier: 'Refaccionaria Norte', stock: 15, status: 'Activo' },
    { id: 'REF-9988', desc: 'Balatas Delanteras', cat: 'Frenos', model: 'VW Jetta 2018', supplier: 'Frenos S.A.', stock: 8, status: 'Inactivo' },
    { id: 'REF-5544', desc: 'Amortiguador Trasero', cat: 'Suspensión', model: 'Toyota Hilux 2022', supplier: 'Surtidora Automotriz', stock: 4, status: 'Activo' }
  ];

  return (
    <div className="admin-card">
      <div className="section-header">
        <h3>Inventario de Refacciones</h3>
        <p className="section-description">Consulta y gestiona el estado de tus productos disponibles.</p>
      </div>

      {/* --- NUEVO: APARTADO DE FILTROS Y BÚSQUEDA --- */}
      <div className="inventory-controls">
        <div className="search-box">
          <input type="text" placeholder="🔍 Buscar por SKU o nombre..." className="inventory-search" />
        </div>
        
        <div className="filter-group">
          <select className="inventory-select">
            <option value="">Todas las Categorías</option>
            <option value="frenos">Frenos</option>
            <option value="motor">Motor</option>
            <option value="suspension">Suspensión</option>
          </select>

          <select className="inventory-select">
            <option value="">Todos los Modelos</option>
            <option value="nissan">Nissan March 2020</option>
            <option value="vw">VW Jetta 2018</option>
            <option value="toyota">Toyota Hilux 2022</option>
          </select>
        </div>
      </div>

      {/* --- TABLA ACTUALIZADA --- */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID / SKU</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Modelo (Auto)</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Existencia</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id}>
                <td><span className="sku-badge">{item.id}</span></td>
                <td>{item.desc}</td>
                <td>{item.cat}</td>
                <td>{item.model}</td>
                <td className="text-center">
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-center font-bold text-navy">{item.stock} pzas</td>
                <td className="text-center">
                  <button className="btn-status-toggle">
                    Cambiar Estado
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

export default Inventory;