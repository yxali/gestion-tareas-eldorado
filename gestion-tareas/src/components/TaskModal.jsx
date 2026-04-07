import { useState } from 'react';
import { taskService } from '../services/taskService';

const TaskModal = ({ onTaskAdded }) => {
  const [taskData, setTaskData] = useState({ title: '', priority: 'media', description: '' });

  const handleSave = () => {
    if (!taskData.title) return alert("¡El título es obligatorio!");
    
    taskService.saveTask(taskData);
    alert("Tarea guardada con éxito");

    onTaskAdded();
    
    // Limpiar formulario y cerrar (esto último requiere una pequeña ayuda de Bootstrap)
    setTaskData({ title: '', priority: 'media', description: '' });
  };

  return (
    <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">Crear Nueva Tarea</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary"
                  value={taskData.title}
                  onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prioridad</label>
                <select 
                  className="form-select bg-dark text-white border-secondary"
                  value={taskData.priority}
                  onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control bg-dark text-white border-secondary" 
                  rows="3"
                  value={taskData.description}
                  onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer border-secondary">
            <button type="button" className="btn btn-primary w-100" onClick={handleSave} data-bs-dismiss="modal">
              Guardar Tarea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;