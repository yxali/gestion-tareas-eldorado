import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { categoryService } from '../services/categoryService';

const TaskModal = ({ onTaskAdded, taskToEdit, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'baja',
    category: 'General'
  });

  const refreshCategories = () => {
    const freshCats = categoryService.getCategories();
    setCategories(freshCats);
  };

  // Detectar si el usuario quiere editar o crear
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority || 'baja',
        category: taskToEdit.category || 'General'
      });
    } else {
      setFormData({ title: '', description: '', priority: 'baja', category: 'General' });
    }
  }, [taskToEdit]);

  // Eventos de Bootstrap para recargar categorías
  useEffect(() => {
    const modalElement = document.getElementById('taskModal');
    const onShow = () => refreshCategories();
    modalElement.addEventListener('show.bs.modal', onShow);
    refreshCategories();

    return () => modalElement.removeEventListener('show.bs.modal', onShow);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.title) return alert("¡El título es obligatorio!");
    
    if (taskToEdit) {
      onUpdate({ ...formData, id: taskToEdit.id, completed: taskToEdit.completed });
    } else {
      taskService.saveTask({ ...formData, id: Date.now(), completed: false });
      onTaskAdded();
    }
    // El modal se cierra por data-bs-dismiss="modal" en el botón
  };

  return (
    <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-body border-secondary shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-body">
              {taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-start">
            <form>
              <div className="mb-3">
                <label className="form-label text-body fw-bold">Título</label>
                <input type="text" name="title" className="form-control bg-body-tertiary text-body border-secondary" value={formData.title} onChange={handleInputChange} placeholder="Ej: Estudiar React" />
              </div>
              <div className="mb-3">
                <label className="form-label text-body fw-bold">Prioridad</label>
                <select name="priority" className="form-select bg-body-tertiary text-body border-secondary" value={formData.priority} onChange={handleInputChange}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-body fw-bold">Categoría</label>
                <select name="category" className="form-select bg-body-tertiary text-body border-secondary" value={formData.category} onChange={handleInputChange}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-body fw-bold">Descripción</label>
                <textarea name="description" className="form-control bg-body-tertiary text-body border-secondary" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer border-secondary">
            <button type="button" className={`btn ${taskToEdit ? 'btn-warning' : 'btn-primary'} w-100 fw-bold`} onClick={handleSave} data-bs-dismiss="modal">
              {taskToEdit ? 'Actualizar Tarea' : 'Guardar Tarea'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;