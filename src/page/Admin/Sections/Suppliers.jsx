const Suppliers = () => {
  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Registro de Proveedores
          </h3>
          <p className="text-secondary small mb-0">
            Registra las empresas que surten las refacciones para tu inventario.
          </p>
        </div>

        <form>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Nombre de la Empresa (Razón Social)</label>
              <input type="text" className="form-control" placeholder="Ej: Refaccionaria del Norte S.A." required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Nombre del Contacto</label>
              <input type="text" className="form-control" placeholder="Nombre de la persona encargada" required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Correo Electrónico</label>
              <input type="email" className="form-control" placeholder="contacto@proveedor.com" required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Número de Teléfono</label>
              <input type="tel" className="form-control" placeholder="Ej: 55-1234-5678" required />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn text-white fw-bold text-uppercase px-4 py-2 border-0"
              style={{ backgroundColor: '#001F3F', letterSpacing: '1px' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F59E0B'; e.target.style.color = '#001F3F'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#001F3F'; e.target.style.color = 'white'; }}
            >
              Registrar Proveedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Suppliers;
