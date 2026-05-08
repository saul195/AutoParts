import { useState } from 'react'
import Navbar from './componets/Navbar/Navbar'
import AdminDashboard from './page/Admin/AdminDashboard'
import './App.css'

function App() {
  // 'client' será la vista por defecto, 'admin' para el panel
  const [view, setView] = useState('client')

  return (
    <div className="app-container">
      {/* Pasamos setView al Navbar para poder cambiar de vista desde ahí */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo" onClick={() => setView('client')} style={{cursor: 'pointer'}}>
            AUTO<span>PARTS</span>
          </h1>
          <div className="nav-links">
            <button onClick={() => setView('client')} className="nav-link-btn">Tienda</button>
            <button onClick={() => setView('admin')} className="nav-link-btn">Panel Admin</button>
          </div>
        </div>
      </nav>

      {/* Renderizado Condicional */}
      <main>
        {view === 'client' ? (
          <section style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Bienvenido a la Refaccionaria Saúl 🔧</h1>
            <p>Estás en la vista de Clientes.</p>
          </section>
        ) : (
          <AdminDashboard />
        )}
      </main>
    </div>
  )
}

export default App