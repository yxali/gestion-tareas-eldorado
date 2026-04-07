const LOCAL_STORAGE_KEY = 'eldorado_tasks';

export const taskService = {
  // 1. Obtener todas las tareas
  getTasks: () => {
    const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  // 2. Guardar una nueva tarea
  saveTask: (newTask) => {
    const tasks = taskService.getTasks();
    const updatedTasks = [...tasks, { ...newTask, id: Date.now(), status: 'pendiente' }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    return updatedTasks;
  }, 

   deleteTask: (id) => {
     const tasks = taskService.getTasks();
     const filteredTasks = tasks.filter(task => task.id !== id);
     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTasks));
     return filteredTasks;
  }
};

