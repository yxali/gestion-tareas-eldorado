const Dashboard = ({ tasks, onDelete }) => {
  return (
    <div className="container-fluid p-4 text-white">
      <header className="mb-4">
        <h1 className="fw-bold">Panel de Control</h1>
        <p className="text-muted">Empresa El Dorado</p>
      </header>

      {/* --- SECCIÓN DE TARJETAS (Todas en una fila) --- */}
      <div className="row g-3 mb-5">
        {/* Total */}
        <div className="col-md-3">
          <div className="card bg-dark text-white border-primary border-start border-4 p-3 shadow-sm">
            <small className="text-muted fw-bold d-block mb-1">TOTAL TAREAS</small>
            <h2 className="fw-bold mb-0 text-primary">{tasks.length}</h2>
          </div>
        </div>

        {/* Alta */}
        <div className="col-md-3">
          <div className="card bg-dark text-white border-danger border-start border-4 p-3 shadow-sm">
            <small className="text-muted fw-bold d-block mb-1">URGENTES (ALTA)</small>
            <h2 className="fw-bold mb-0 text-danger">
              {tasks.filter(t => t.priority === 'alta').length}
            </h2>
          </div>
        </div>

        {/* Media */}
        <div className="col-md-3">
          <div className="card bg-dark text-white border-warning border-start border-4 p-3 shadow-sm">
            <small className="text-muted fw-bold d-block mb-1">PENDIENTES (MEDIA)</small>
            <h2 className="fw-bold mb-0 text-warning">
              {tasks.filter(t => t.priority === 'media').length}
            </h2>
          </div>
        </div>

        {/* Baja */}
        <div className="col-md-3">
          <div className="card bg-dark text-white border-info border-start border-4 p-3 shadow-sm">
            <small className="text-muted fw-bold d-block mb-1">RELAJADAS (BAJA)</small>
            <h2 className="fw-bold mb-0 text-info">
              {tasks.filter(t => t.priority === 'baja').length}
            </h2>
          </div>
        </div> 
      </div>

      {/* --- LISTADO DE TAREAS --- */}
      <div className="row">
        <div className="col-12">
          <h4 className="mb-3">Tareas Recientes</h4>
          <div className="list-group">
            {tasks.length === 0 ? (
              <p className="text-muted">No hay tareas. ¡Haz clic en &quot;+ Nueva Tarea&quot;!</p>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center mb-2 rounded shadow-sm"
                >
                  <div>
                    <h5 className="mb-1">{task.title}</h5>
                    <small className="text-muted d-block">{task.description}</small>
                    <span className={`badge mt-1 ${
                      task.priority === 'alta' ? 'bg-danger' : 
                      task.priority === 'media' ? 'bg-warning text-dark' : 'bg-info text-dark'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <button 
                    className="btn btn-outline-danger btn-sm border-0" 
                    title="Eliminar tarea"
                    onClick={() => onDelete(task.id)}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🗑️</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;