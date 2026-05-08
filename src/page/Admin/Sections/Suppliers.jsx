import './Sections.css';

const Suppliers = () => {
  return (
    <div className="admin-card">
      <div className="section-header">
        <h3>Registro de Proveedores</h3>
        <p className="section-description">
          Registra las empresas que surten las refacciones para tu inventario.
        </p>
      </div>

      <form className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de la Empresa (Razón Social)</label>
            <input type="text" placeholder="Ej: Refaccionaria del Norte S.A." required />
          </div>
          <div className="form-group">
            <label>Nombre del Contacto</label>
            <input type="text" placeholder="Nombre de la persona encargada" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="contacto@proveedor.com" required />
          </div>
          <div className="form-group">
            <label>Número de Teléfono</label>
            <input type="tel" placeholder="Ej: 55-1234-5678" required />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Registrar Proveedor
          </button>
        </div>
      </form>
    </div>
  );
};

export default Suppliers;