import { useState } from 'react';

// Añadimos 'theme' y 'onEdit' a las props
const TaskList = ({ tasks, onDelete, onToggle, onEdit, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(tasks.map(t => t.category || 'General'))];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todas' || (task.category || 'General') === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold text-body-emphasis mb-4">Todas las Tareas</h2>

      {/* --- FILTROS --- */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control bg-body-tertiary border-0 shadow-sm" 
            placeholder="Buscar tarea" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select 
            className="form-select bg-body-tertiary border-0 shadow-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* --- TABLA --- */}
      <div className="card bg-body-tertiary border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            {/* Cabecera Inversa */}
            <thead className={theme === 'light' ? 'table-dark' : 'table-light'}>
              <tr>
                <th style={{ width: '80px' }} className="text-center ps-3">Estado</th>
                <th>Tarea</th>
                <th style={{ width: '180px' }} className="text-center">Categoría</th>
                <th style={{ width: '180px' }} className="text-center">Prioridad</th>
                <th style={{ width: '180px' }} className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-muted">
                    No se encontraron tareas con esos filtros.
                  </td>
                </tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task.id} className={task.completed ? 'opacity-50' : ''}>
                    {/* ESTADO - Alineado con th */}
                    <td className="text-center ps-3">
                      <input 
                        type="checkbox" 
                        className="form-check-input"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                      />
                    </td>
                    
                    {/* TAREA */}
                    <td>
                      <div className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                        <span className="fw-bold text-body">{task.title}</span>
                        <br />
                        <small>{task.description}</small>
                      </div>
                    </td>

                    {/* CATEGORÍA - Alineada al centro con th */}
                    <td className="text-center">
                      <span className="badge bg-secondary-subtle text-body-secondary border">
                        {task.category || 'General'}
                      </span>
                    </td>

                    {/* PRIORIDAD - Alineada al centro con th */}
                    <td className="text-center">
                      <span className={`badge rounded-pill ${
                        task.priority?.toLowerCase() === 'alta' ? 'bg-danger' : 
                        task.priority?.toLowerCase() === 'media' ? 'bg-warning text-dark' : 'bg-info text-dark'
                      }`}>
                        {task.priority?.toUpperCase()}
                      </span>
                    </td>

                    {/* ACCIONES - Alineadas a la derecha con th */}
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary border-0"
                          onClick={() => onEdit(task)}
                          data-bs-toggle="modal" 
                          data-bs-target="#taskModal"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => onDelete(task.id)}
                        >
                          🗑️
                        </button>
                      </div>
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