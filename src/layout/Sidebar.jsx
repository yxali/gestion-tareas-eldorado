
import { Link } from "react-router-dom";

const Sidebar = ({ theme, toggleTheme }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 shadow border-end bg-body-tertiary" style={{ width: '280px', minHeight: '100vh' }}>
      
      {/* TÍTULO */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-4 fw-bold text-body">El Dorado</span>
      </div>
      <hr />

      {/* 🚀 EL BOTÓN MÁGICO (AQUÍ ESTÁ) */}
      <div className="mb-4">
        <button 
          className={`btn w-100 fw-bold ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`} 
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
      </div>

      {/* MENÚ */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Panel de Control
          </Link>
        </li>
        <li>
          <Link to="/tareas" className="nav-link">
            Todas las Tareas
          </Link>
        </li>
        <li>
          <Link to="/categorias" className="nav-link">
            Categorías
          </Link>
        </li>
      </ul>

      <hr />

      {/* BOTÓN NUEVA TAREA */}
      <div className="pb-2">
        <button 
          className="btn btn-primary w-100 shadow-sm" 
          data-bs-toggle="modal" 
          data-bs-target="#taskModal"
        >
          + Nueva Tarea
        </button>
      </div>
    </div>
  );
};

export default Sidebar;