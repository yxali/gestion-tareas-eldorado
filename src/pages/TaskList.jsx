const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="p-4">
      <h2 className="fw-bold text-body" >Todas las Tareas</h2>
      <div className="card shadow-sm border-secondary-subtle bg-body-tertiary">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-body">
                <th className="bg-transparent">Estado</th>
                <th className="bg-transparent">Tarea</th>
                <th className="bg-transparent">Categoría</th>
                <th className="bg-transparent">Prioridad</th>
                <th className="bg-transparent text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-body">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No hay tareas registradas</td>
                </tr>
              ) : (
                tasks.map(task => (
                  <tr key={task.id} className="border-secondary-subtle">
                    {/* 1. ESTADO */}
                    <td>
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={task.completed || false}
                        onChange={() => onToggle(task.id)}
                      />
                    </td>
                    
                    {/* 2. TAREA */}
                    <td>
                      <span className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                        {task.title}
                      </span>
                    </td>

                    {/* 3. CATEGORÍA (¡Esta te faltaba en el map!) */}
                    <td>
                      <span className="badge rounded-pill border text-body-secondary bg-body-secondary">
                        {task.category || 'General'}
                      </span>
                    </td>

                    {/* 4. PRIORIDAD */}
                    <td>
                      <span className={`badge ${
                        task.priority === 'Alta' ? 'bg-danger' : 
                        task.priority === 'Media' ? 'bg-warning text-dark' : 'bg-info text-dark'
                      }`}>
                        {task.priority}
                      </span>
                    </td>

                    {/* 5. ACCIONES */}
                    <td className="text-end">
                      <button 
                        className="btn btn-outline-danger btn-sm border-0"
                        onClick={() => onDelete(task.id)}
                      >
                        <i className="bi bi-trash3"></i> Borrar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;