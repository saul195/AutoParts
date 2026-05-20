const Navbar = ({ setView }) => {
  return (
    <nav className="navbar navbar-dark px-4 py-3 shadow" style={{ backgroundColor: '#001F3F' }}>
      <div className="container-fluid d-flex align-items-center gap-3">
        <h1 className="navbar-brand mb-0 fs-4 fw-bolder cursor-pointer"
          style={{ color: '#F59E0B' }}
          onClick={() => setView('client')}
        >
          AUTO<span className="text-white">PARTS</span>
        </h1>

        <div className="flex-grow-1" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Buscar refacciones..."
            className="form-control border-0 text-white"
            style={{ backgroundColor: '#00152b' }}
          />
        </div>

        <div className="d-flex align-items-center gap-3">
          <button onClick={() => setView('client')}
            className="btn btn-sm fw-semibold text-white border-0"
            style={{ background: 'transparent' }}
            onMouseEnter={(e) => e.target.style.color = '#F59E0B'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            Tienda
          </button>
          <button onClick={() => setView('admin')}
            className="btn btn-sm fw-semibold text-white border-0"
            style={{ backgroundColor: '#1E293B' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#F59E0B'; e.target.style.color = '#001F3F'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#1E293B'; e.target.style.color = 'white'; }}
          >
            Panel Admin
          </button>
          <div className="position-relative">
            <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>🛒</span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              style={{ backgroundColor: '#F59E0B', color: '#001F3F', fontSize: '0.65rem' }}
            >
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
