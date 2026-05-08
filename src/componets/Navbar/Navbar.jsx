import './Navbar.css';

const Navbar = ({ setView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo que regresa a la tienda al hacer clic */}
        <h1 className="logo" onClick={() => setView('client')}>
          AUTO<span>PARTS</span>
        </h1>
        
        {/* Buscador de refacciones */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar refacciones..." 
            className="search-input" 
          />
        </div>

        {/* Botones de navegación */}
        <div className="nav-links">
          <button onClick={() => setView('client')} className="nav-link-btn">
            Tienda
          </button>
          <button onClick={() => setView('admin')} className="nav-link-btn admin-btn">
            Panel Admin
          </button>
          <div className="cart-icon">
            <span>🛒</span>
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;