import React, { useState } from "react";
import "./Store.css";

const Store = () => {
  // Datos de prueba (luego vendrán de tu base de datos)
  const [products] = useState([
    {
      id: 1,
      sku: "REF-1020",
      name: "Amortiguador Delantero",
      category: "Suspensión",
      model: "Nissan Versa 2020",
      price: 1250,
      image: "https://via.placeholder.com/200", // Aquí irían las WebP optimizadas
    },
    {
      id: 2,
      sku: "REF-5040",
      name: "Pastillas de Freno",
      category: "Frenos",
      model: "Nissan March 2018",
      price: 450,
      image: "https://via.placeholder.com/200",
    },
  ]);

  return (
    <div className="store-container">
      <header className="store-header">
        <h2>Catálogo de Refacciones</h2>
        <div className="store-filters">
          <input
            type="text"
            placeholder="Buscar pieza o modelo..."
            className="search-input"
          />
          <select className="filter-select">
            <option value="">Todas las categorías</option>
            <option value="frenos">Frenos</option>
            <option value="suspension">Suspensión</option>
          </select>
        </div>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} />
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-info">
              <p className="product-sku">{product.sku}</p>
              <h3>{product.name}</h3>
              <p className="product-model">
                🚗 Compatible con: {product.model}
              </p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button className="btn-add-cart">Añadir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
