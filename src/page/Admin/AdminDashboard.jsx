import { useState } from 'react';
import './AdminDashboard.css';

// Importamos los componentes de las secciones
import Clients from './Sections/Clients';
import Inventory from './Sections/Inventory';
import AddProduct from './Sections/AddProduct'; // <-- ESTA LÍNEA FALTABA
import Suppliers from './Sections/Suppliers';
import Orders from './Sections/Orders';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('clients');

  return (
    <div className="admin-container">
      {/* Sidebar Lateral */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Panel Admin</h2>
        <ul className="sidebar-menu">
          <li 
            className={activeSection === 'clients' ? 'active' : ''} 
            onClick={() => setActiveSection('clients')}
          >
            👥 Clientes
          </li>
          <li 
            className={activeSection === 'inventory' ? 'active' : ''} 
            onClick={() => setActiveSection('inventory')}
          >
            📦 Ver Inventario
          </li>
          <li 
            className={activeSection === 'add-product' ? 'active' : ''} 
            onClick={() => setActiveSection('add-product')}
          >
            ➕ Agregar Producto
          </li>
          <li 
            className={activeSection === 'suppliers' ? 'active' : ''} 
            onClick={() => setActiveSection('suppliers')}
          >
            🚚 Proveedores
          </li>
          <li 
            className={activeSection === 'orders' ? 'active' : ''} 
            onClick={() => setActiveSection('orders')}
          >
            🧾 Órdenes
          </li>
        </ul>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="admin-content">
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