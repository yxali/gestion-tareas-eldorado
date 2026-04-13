import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');

  // Cargar categorías al iniciar
  useEffect(() => {
    const data = categoryService.getCategories();
    setCategories(data);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCat.trim()) {
      const updated = categoryService.addCategory(newCat.trim());
      setCategories(updated);
      setNewCat('');
    }
  };

  const handleDelete = (catName) => {
    if (catName === 'General') return alert("La categoría General no se puede borrar");
    
    if (window.confirm(`¿Estás seguro de borrar "${catName}"?`)) {
      const updated = categoryService.deleteCategory(catName);
      setCategories(updated);
    }
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold text-body-emphasis">Gestionar Categorías</h2>
      
      {/* Formulario para añadir */}
      <form onSubmit={handleAdd} className="d-flex gap-2 mb-4 mt-3" style={{ maxWidth: '400px' }}>
        <input 
          type="text" 
          className="form-control bg-body-tertiary text-body border-secondary" 
          placeholder="Nueva categoría..." 
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Añadir</button>
      </form>

      {/* Lista de categorías */}
      <div className="list-group shadow-sm" style={{ maxWidth: '400px' }}>
        {categories.map((cat) => (
          <div 
            key={cat} 
            className="list-group-item bg-body-tertiary text-body border-secondary-subtle d-flex justify-content-between align-items-center"
          >
            <span className="fw-medium">{cat}</span>
            
            {/* El botón de borrar solo aparece si no es 'General' */}
            {cat !== 'General' && (
              <button 
                type="button"
                className="btn btn-sm btn-outline-danger border-0"
                onClick={() => handleDelete(cat)}
              >
                <i className="bi bi-trash3"></i> 
                {/* Si el icono no carga, verás la palabra Borrar */}
                <span className="d-none d-md-inline ms-1 text-danger">Borrar</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;