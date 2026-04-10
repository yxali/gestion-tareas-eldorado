const Dashboard = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="container-fluid p-4">
      <header className="mb-4">
        <h1 className="fw-bold text-body">Panel de Control</h1>
        <p className="text-body-secondary">Empresa El Dorado</p>
      </header>

      {/* --- SECCIÓN DE TARJETAS --- */}
      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className="card bg-body-tertiary border-primary border-start border-4 p-3 shadow-sm">
            <small className="text-body-secondary fw-bold d-block mb-1">TOTAL TAREAS</small>
            <h2 className="fw-bold mb-0 text-primary">{tasks.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-body-tertiary border-danger border-start border-4 p-3 shadow-sm">
            <small className="text-body-secondary fw-bold d-block mb-1">URGENTES (ALTA)</small>
            <h2 className="fw-bold mb-0 text-danger">
              {tasks.filter(t => t.priority === 'alta').length}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-body-tertiary border-warning border-start border-4 p-3 shadow-sm">
            <small className="text-body-secondary fw-bold d-block mb-1">PENDIENTES (MEDIA)</small>
            <h2 className="fw-bold mb-0 text-warning">
              {tasks.filter(t => t.priority === 'media').length}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-body-tertiary border-info border-start border-4 p-3 shadow-sm">
            <small className="text-body-secondary fw-bold d-block mb-1">RELAJADAS (BAJA)</small>
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
              <p className="text-muted text-center p-4">No hay tareas. ¡Haz clic en "+ Nueva Tarea"!</p>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`list-group-item bg-body-tertiary border-0 d-flex justify-content-between align-items-center mb-2 rounded shadow-sm ${task.completed ? 'opacity-50' : ''}`}
                >
                  {/* Contenedor Izquierdo: Checkbox + Textos */}
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={task.completed || false}
                      onChange={() => onToggle(task.id)}
                      style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                    <div>
                      <h5 className={`mb-1 text-body ${task.completed ? 'text-decoration-line-through' : ''}`}>
                        {task.title}
                      </h5>
                      <small className="text-body-secondary d-block">{task.description}</small>
                      <span className={`badge mt-1 ${
                        task.priority === 'alta' ? 'bg-danger' : 
                        task.priority === 'media' ? 'bg-warning text-dark' : 'bg-info text-dark'
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                  </div> 

                  {/* Botón Eliminar: A la derecha gracias al justify-content-between */}
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