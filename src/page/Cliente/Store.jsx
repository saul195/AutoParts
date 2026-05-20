import React, { useState } from "react";

const productsData = [
  {
    id: 1,
    sku: "REF-1020",
    name: "Amortiguador Delantero",
    category: "Suspensión",
    model: "Nissan Versa 2020",
    price: 1250,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/NISSAN_FUGA_Y50_front_shock_absorber.jpg",
  },
  {
    id: 2,
    sku: "REF-5040",
    name: "Pastillas de Freno",
    category: "Frenos",
    model: "Nissan March 2018",
    price: 450,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/New_brake_pads_%28372366587%29.jpg",
  },
  {
    id: 3,
    sku: "REF-2070",
    name: "Filtro de Aceite",
    category: "Motor",
    model: "Vento 2021",
    price: 180,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Engine_oil_filter.JPG",
  },
  {
    id: 4,
    sku: "REF-3300",
    name: "Juego de Bujías",
    category: "Motor",
    model: "Jetta 2019",
    price: 320,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Spark_plug_2.jpg",
  },
  {
    id: 5,
    sku: "REF-8100",
    name: "Radiador de Aluminio",
    category: "Refrigeración",
    model: "Toyota Hilux 2022",
    price: 2100,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Automobile_radiator.jpg",
  },
  {
    id: 6,
    sku: "REF-4400",
    name: "Batería 12V 75Ah",
    category: "Eléctrico",
    model: "Universal",
    price: 1350,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lead-acid_automotive_battery%2C_55_Ah.jpg",
  },
  {
    id: 7,
    sku: "REF-6600",
    name: "Alternador 120A",
    category: "Eléctrico",
    model: "Chevrolet Aveo 2017",
    price: 2800,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Alternator.jpg",
  },
  {
    id: 8,
    sku: "REF-9900",
    name: "Neumático 205/55R16",
    category: "Llantas",
    model: "Universal",
    price: 1650,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/2017-09-28_%28435%29_Vredestein_Sportrac_3_195-55_R_16_87_V_tire_at_Bahnhof_Stockerau.jpg",
  },
];

const Store = ({ onAddToCart }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = productsData.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.model.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || p.category === category;
    return matchSearch && matchCategory;
  });

  const categories = [...new Set(productsData.map((p) => p.category))];

  return (
    <div className="container py-4" style={{ maxWidth: "1200px" }}>
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
        <h2
          className="fw-bolder mb-0"
          style={{ color: "#001F3F", fontSize: "2rem" }}
        >
          Catálogo de Refacciones
        </h2>
        <div className="d-flex gap-3">
          <input
            type="text"
            placeholder="Buscar pieza o modelo..."
            className="form-control"
            style={{ minWidth: "200px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ minWidth: "160px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filtered.map((product) => (
          <div key={product.id} className="col">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "12px", transition: "transform 0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div
                className="position-relative"
                style={{ height: "200px", background: "#F8FAFC" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    const parent = e.target.parentElement;
                    parent.innerHTML = `<div class="w-100 h-100 d-flex align-items-center justify-content-center" style="background:#e2e8f0;color:#94a3b8;font-size:0.9rem;padding:1rem;text-align:center">${e.target.alt}</div>`;
                  }}
                />
                <span
                  className="position-absolute top-0 start-0 badge text-white text-uppercase m-2"
                  style={{ backgroundColor: "#001F3F", fontSize: "0.7rem" }}
                >
                  {product.category}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <p className="small text-secondary font-monospace mb-1">
                  {product.sku}
                </p>
                <h3
                  className="card-title h6 mb-2"
                  style={{ color: "#001F3F" }}
                >
                  {product.name}
                </h3>
                <p className="small text-secondary mb-3">
                  🚗 Compatible con: {product.model}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                  <span className="fw-bolder fs-5" style={{ color: "#001F3F" }}>
                    ${product.price}
                  </span>
                  <button
                    className="btn btn-sm fw-bold border-0"
                    style={{ backgroundColor: "#F59E0B", color: "#001F3F" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#D97706")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#F59E0B")
                    }
                    onClick={() => onAddToCart(product)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-secondary mt-5 fs-5">
          No se encontraron productos con esos filtros.
        </p>
      )}
    </div>
  );
};

export default Store;
