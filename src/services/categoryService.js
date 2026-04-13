const STORAGE_KEY = 'eldorado_categories';

export const categoryService = {
  getCategories: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    // Categorías por defecto si está vacío
    return data ? JSON.parse(data) : ['General', 'Trabajo', 'Personal'];
  },

  addCategory: (name) => {
    const categories = categoryService.getCategories();
    if (!categories.includes(name)) {
      const updated = [...categories, name];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
    return categories;
  },

deleteCategory: (categoryToDelete) => {
    let categories = categoryService.getCategories();
    // Filtramos para dejar todas excepto la que queremos borrar
    categories = categories.filter(cat => cat !== categoryToDelete);
    localStorage.setItem('categories', JSON.stringify(categories));
    return categories; // Retornamos la nueva lista para actualizar el estado en React
  }
};