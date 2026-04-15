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

deleteCategory: (name) => {
    let cats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const filtered = cats.filter(c => c !== name);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered; // Retornamos la nueva lista para actualizar el estado en React
  }
};