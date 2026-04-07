const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow" style={{ width: '280px', minHeight: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">Gestor de Tareas</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active bg-primary" aria-current="page">
            Panel de Control
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">Todas las Tareas</a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">Categorías</a>
        </li>
      </ul>
      <hr />
      <div className="pb-2">
        <button 
          className="btn btn-primary w-100" 
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