import React, { useState } from "react";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            setCompressedBlob(blob);
            setImagePreview(URL.createObjectURL(blob));
          },
          "image/webp",
          0.8,
        );
      };
    };
  };

  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Registrar Nuevo Producto
          </h3>
          <p className="text-secondary small mb-0">
            Introduce los datos de la nueva refacción para añadirla al sistema.
          </p>
        </div>

        <form>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>ID Único (SKU)</label>
                  <input type="text" className="form-control" placeholder="Ej: REF-1020" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Categoría</label>
                  <select className="form-select" required>
                    <option value="">Seleccionar...</option>
                    <option value="frenos">Frenos</option>
                    <option value="motor">Motor</option>
                    <option value="suspension">Suspensión</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Descripción</label>
                  <textarea className="form-control" placeholder="Detalles de la refacción..." rows="3" required></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Modelo (Carro)</label>
                  <input type="text" className="form-control" placeholder="Ej: Nissan March 2020" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Proveedor</label>
                  <select className="form-select" required>
                    <option value="">Selecciona un proveedor</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <label className="form-label fw-semibold small" style={{ color: '#001F3F' }}>Fotografía del Producto</label>
              <div
                className="d-flex flex-column align-items-center justify-content-center rounded cursor-pointer overflow-hidden position-relative"
                style={{
                  border: '2px dashed #cbd5e1',
                  background: '#f8fafc',
                  height: '280px',
                  transition: 'all 0.3s',
                }}
                onClick={() => document.getElementById("product-image").click()}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.background = '#f1f5f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                ) : (
                  <>
                    <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📸</span>
                    <p className="small fw-semibold text-secondary mb-0">Haz clic para subir imagen</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                  id="product-image"
                />
              </div>
              {compressedBlob && (
                <p className="small text-secondary mt-1 mb-0">
                  Imagen optimizada: {(compressedBlob.size / 1024).toFixed(2)} KB
                </p>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn text-white fw-bold text-uppercase px-4 py-2 border-0"
              style={{ backgroundColor: '#001F3F', letterSpacing: '1px' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F59E0B'; e.target.style.color = '#001F3F'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#001F3F'; e.target.style.color = 'white'; }}
            >
              Guardar en Sistema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
