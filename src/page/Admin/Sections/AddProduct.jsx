import './Sections.css';

const AddProduct = () => {
  return (
    <div className="admin-card">
      <div className="section-header">
        <h3>Registrar Nuevo Producto</h3>
        <p className="section-description">Introduce los datos de la nueva refacción para añadirla al sistema.</p>
      </div>

      <form className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>ID Único (SKU)</label>
            <input type="text" placeholder="Ej: REF-1020" required />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select required>
              <option value="">Seleccionar...</option>
              <option value="frenos">Frenos</option>
              <option value="motor">Motor</option>
              <option value="suspension">Suspensión</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea placeholder="Detalles de la refacción..." rows="3" required></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Modelo (Carro)</label>
            <input type="text" placeholder="Ej: Nissan March 2020" required />
          </div>
          <div className="form-group">
            <label>Proveedor</label>
            <select required>
              <option value="">Selecciona un proveedor registrado</option>
              {/* Estos vendrán de la tabla de Suppliers */}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">Guardar en Sistema</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;