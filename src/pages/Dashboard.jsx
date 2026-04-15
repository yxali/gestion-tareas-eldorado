import { useState } from "react";

const Dashboard = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [filter, setFilter] = useState('Todas');

  // 1. Filtrado de tareas por prioridad
  const filteredTask = tasks.filter(task =>
    filter === 'Todas' || task.priority?.toLowerCase() === filter.toLowerCase()
  );

  // 2. Cálculos para los contadores de las tarjetas
  const countAlta = tasks.filter(t => t.priority?.toLowerCase() === 'alta').length;
  const countMedia = tasks.filter(t => t.priority?.toLowerCase() === 'media').length;
  const countBaja = tasks.filter(t => t.priority?.toLowerCase() === 'baja').length;

  return (
    <div className="container-fluid p-4">
      <header className="mb-4">
        <h2 className="fw-bold text-body-emphasis">Panel de Control</h2>
      </header>

      {/* --- SECCIÓN DE TARJETAS (INDICADORES) --- */}
      <div className="row g-3 mb-5">
        <div className="col-md-3">
          <div className={`card border-start border-4 p-3 shadow-sm ${filter === 'Todas' ? 'bg-primary-subtle border-primary' : 'bg-body-tertiary border-primary'}`}
            style={{ cursor: 'pointer', transition: '0.3s' }}
            onClick={() => setFilter('Todas')}
          >
            <small className="text-body-secondary fw-bold d-block mb-1">Total de tareas</small>
            <h2 className="fw-bold mb-0 text-primary">{tasks.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div 
            className={`card border-start border-4 p-3 shadow-sm transition-all ${
              filter.toLowerCase() === 'alta' ? 'bg-danger-subtle border-danger' : 'bg-body-tertiary border-danger'
            }`}
            style={{ cursor: 'pointer', transition: '0.3s' }}
            onClick={() => setFilter('alta')}
          >
            <small className="text-body-secondary fw-bold d-block mb-1">Prioridad Alta</small>
            <h2 className="fw-bold mb-0 text-danger">{countAlta}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div 
            className={`card border-start border-4 p-3 shadow-sm transition-all ${
              filter.toLowerCase() === 'media' ? 'bg-warning-subtle border-warning' : 'bg-body-tertiary border-warning'
            }`}
            style={{ cursor: 'pointer', transition: '0.3s' }}
            onClick={() => setFilter('media')}
          >
            <small className="text-body-secondary fw-bold d-block mb-1">Prioridad Media</small>
            <h2 className="fw-bold mb-0 text-warning">{countMedia}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div 
            className={`card border-start border-4 p-3 shadow-sm transition-all ${
              filter.toLowerCase() === 'baja' ? 'bg-info-subtle border-info' : 'bg-body-tertiary border-info'
            }`}
            style={{ cursor: 'pointer', transition: '0.3s' }}
            onClick={() => setFilter('baja')}
          >
            <small className="text-body-secondary fw-bold d-block mb-1">Prioridad Baja</small>
            <h2 className="fw-bold mb-0 text-info">{countBaja}</h2>
          </div>
        </div> 
      </div>

      {/* --- LISTADO DE TAREAS RECIENTES --- */}
      <div className="row">
        <div className="col-12">
          <h4 className="mb-3 text-body-emphasis">Tareas Recientes</h4>
          <div className="list-group">
            {tasks.length === 0 ? (
              <p className="text-muted text-center p-5 bg-body-tertiary rounded border border-secondary shadow-sm">
                {`No hay tareas. ¡Haz clic en &quot;+ Nueva Tarea&quot;!`}
              </p>
            ) : (
              filteredTask.map((task) => (
                <div 
                  key={task.id} 
                  className={`list-group-item bg-body-tertiary border-0 d-flex justify-content-between align-items-center mb-2 rounded shadow-sm ${task.completed ? 'opacity-50' : ''}`}
                >
                  {/* Contenedor Izquierdo: Checkbox e Información */}
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={task.completed || false}
                      onChange={() => onToggle(task.id)}
                      style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                    <div>
                      <h5 className={`mb-1 text-body ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                        {task.title}
                      </h5>
                      <small className="text-body-secondary d-block mb-2">{task.description}</small>
                      <div className="d-flex gap-2">
                        <span className={`badge rounded-pill ${
                          task.priority?.toLowerCase() === 'alta' ? 'bg-danger' : 
                          task.priority?.toLowerCase() === 'media' ? 'bg-warning text-dark' : 'bg-info text-dark'
                        }`}>
                          {task.priority?.toUpperCase()}
                        </span>
                        <span className="badge rounded-pill text-body-secondary bg-dark-subtle border border-secondary-subtle">
                          {task.category || 'General'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor Derecho: Botones de Acción */}
                  <div className="d-flex gap-1">
                    <button 
                      className="btn btn-outline-primary btn-sm border-0" 
                      title="Editar tarea"
                      onClick={() => onEdit(task)}
                      data-bs-toggle="modal" 
                      data-bs-target="#taskModal"
                    >
                      <span style={{ fontSize: '1.1rem' }}>✏️</span>
                    </button>
                    
                    <button 
                      className="btn btn-outline-danger btn-sm border-0" 
                      title="Eliminar tarea"
                      onClick={() => onDelete(task.id)}
                    >
                      <span style={{ fontSize: '1.1rem' }}>🗑️</span>
                    </button>
                  </div>
                </div>
              ))
            )}
            
            {/* Mensaje cuando hay tareas pero ninguna coincide con el filtro */}
            {tasks.length > 0 && filteredTask.length === 0 && (
              <p className="text-center text-muted p-4">
                No hay tareas con prioridad "{filter.charAt(0).toUpperCase() + filter.slice(1)}".
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;