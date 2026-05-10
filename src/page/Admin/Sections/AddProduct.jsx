import React, { useState } from "react";
import "./Sections.css";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null); // Archivo listo para el backend

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // --- Lógica de Compresión con Canvas ---
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Tamaño máximo profesional
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertimos a WebP (muy ligero) con calidad del 80%
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
    <div className="admin-card">
      <div className="section-header">
        <h3>Registrar Nuevo Producto</h3>
        <p className="section-description">
          Introduce los datos de la nueva refacción para añadirla al sistema.
        </p>
      </div>

      <form className="admin-form">
        <div className="form-content-layout">
          <div className="form-inputs-side">
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
              <textarea
                placeholder="Detalles de la refacción..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Modelo (Carro)</label>
                <input
                  type="text"
                  placeholder="Ej: Nissan March 2020"
                  required
                />
              </div>
              <div className="form-group">
                <label>Proveedor</label>
                <select required>
                  <option value="">Selecciona un proveedor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-image-group">
            <label>Fotografía del Producto</label>
            <div
              className="image-upload-area"
              onClick={() => document.getElementById("product-image").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <>
                  <span className="upload-icon">📸</span>
                  <p className="upload-text">Haz clic para subir imagen</p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-file-input"
                id="product-image"
              />
            </div>
            {compressedBlob && (
              <p
                style={{ fontSize: "10px", color: "#64748b", marginTop: "5px" }}
              >
                Imagen optimizada: {(compressedBlob.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Guardar en Sistema
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
