import { useState, useEffect } from "react";
import { users } from "../../../services/api";

const Clients = () => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    try {
      const data = await users.list("excluir_admin=true");
      setLista(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await users.delete(id);
      cargar();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card shadow-sm" style={{ borderTop: '4px solid #001F3F' }}>
      <div className="card-body">
        <div className="border-bottom pb-3 mb-3">
          <h3 className="text-uppercase fs-5 mb-1" style={{ color: '#001F3F', letterSpacing: '0.5px' }}>
            Control de Usuarios
          </h3>
          <p className="text-secondary small mb-0">
            Administra los usuarios registrados en el sistema (excluyendo admins).
          </p>
        </div>
        <div className="table-responsive rounded border">
          <table className="table table-hover mb-0 align-middle">
            <thead className="text-white small text-uppercase" style={{ backgroundColor: '#001F3F' }}>
              <tr>
                <th className="px-3 py-3 fw-semibold">Nombre</th>
                <th className="px-3 py-3 fw-semibold">Email</th>
                <th className="px-3 py-3 fw-semibold">Rol</th>
                <th className="px-3 py-3 fw-semibold">Estado</th>
                <th className="px-3 py-3 fw-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4 text-secondary">Cargando...</td></tr>
              ) : lista.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-secondary">No hay usuarios registrados.</td></tr>
              ) : lista.map((u) => (
                <tr key={u.id_usuario}>
                  <td className="px-3 py-3">{u.nombre_completo}</td>
                  <td className="px-3 py-3">{u.email}</td>
                  <td className="px-3 py-3">
                    <span className="badge bg-secondary">{u.rol}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`badge ${u.estado === 'activo' ? 'bg-success' : 'bg-danger'}`}>
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button className="btn btn-danger btn-sm fw-semibold" onClick={() => eliminar(u.id_usuario)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
