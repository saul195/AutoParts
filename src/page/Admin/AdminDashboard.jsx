import { useState } from 'react';
import Clients from './Sections/Clients';
import Inventory from './Sections/Inventory';
import AddProduct from './Sections/AddProduct';
import Suppliers from './Sections/Suppliers';
import Orders from './Sections/Orders';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('clients');

  const navItems = [
    { key: 'clients', label: '👥 Clientes' },
    { key: 'inventory', label: '📦 Ver Inventario' },
    { key: 'add-product', label: '➕ Agregar Producto' },
    { key: 'suppliers', label: '🚚 Proveedores' },
    { key: 'orders', label: '🧾 Órdenes' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <aside className="d-flex flex-column text-white p-4" style={{ width: '260px', backgroundColor: '#001F3F', borderTop: '1px solid #002d5c' }}>
        <h2 className="text-uppercase mb-4 fs-5" style={{ color: '#F59E0B' }}>Panel Admin</h2>
        <nav className="nav flex-column">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-link text-start px-3 py-2 mb-1 rounded ${activeSection === item.key ? '' : ''}`}
              style={{
                background: activeSection === item.key ? '#F59E0B' : 'transparent',
                color: activeSection === item.key ? '#001F3F' : 'white',
                fontWeight: activeSection === item.key ? 'bold' : 'normal',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.key) {
                  e.target.style.background = '#F59E0B';
                  e.target.style.color = '#001F3F';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.key) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }
              }}
              onClick={() => setActiveSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow-1 p-4" style={{ backgroundColor: '#F8FAFC' }}>
        {activeSection === 'clients' && <Clients />}
        {activeSection === 'inventory' && <Inventory />}
        {activeSection === 'add-product' && <AddProduct />}
        {activeSection === 'suppliers' && <Suppliers />}
        {activeSection === 'orders' && <Orders />}
      </main>
    </div>
  );
};

export default AdminDashboard;
