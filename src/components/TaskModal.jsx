import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { categoryService } from '../services/categoryService';

const TaskModal = ({ onTaskAdded }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Baja',
    category: 'General'
  });

  // Función para obtener categorías frescas
  const refreshCategories = () => {
    const freshCats = categoryService.getCategories();
    setCategories(freshCats);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // useEffect con lógica de limpieza para los eventos de Bootstrap
  useEffect(() => {
    const modalElement = document.getElementById('taskModal');
    
    // Función de callback para el evento
    const onShow = () => refreshCategories();

    // Escuchamos cuando el modal se abre
    modalElement.addEventListener('show.bs.modal', onShow);
    
    // Carga inicial
    refreshCategories();

    // RETORNO DE LIMPIEZA: Elimina el event listener al desmontar el componente
    return () => {
      modalElement.removeEventListener('show.bs.modal', onShow);
    };
  }, []);

  const handleSave = () => {
    if (!formData.title) return alert("¡El título es obligatorio!");
    
    taskService.saveTask(formData);
    alert("Tarea guardada con éxito");

    onTaskAdded();
    
    // Limpiar formulario al cerrar
    setFormData({ 
      title: '', 
      priority: 'Baja', 
      description: '', 
      category: 'General' 
    });
  };

  return (
    <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-body border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-body">Crear Nueva Tarea</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label text-body">Título</label>
                <input 
                  type="text" 
                  name="title"
                  className="form-control bg-body-tertiary text-body border-secondary"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-body">Prioridad</label>
                <select 
                  name="priority"
                  className="form-select bg-body-tertiary text-body border-secondary"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-body">Categoría</label>
                <select 
                  name="category"
                  className="form-select bg-body-tertiary text-body border-secondary"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-body">Descripción</label>
                <textarea 
                  name="description"
                  className="form-control bg-body-tertiary text-body border-secondary" 
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
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