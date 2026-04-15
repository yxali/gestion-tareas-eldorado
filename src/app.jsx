import { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import TaskModal from './components/TaskModal';
import { taskService } from './services/taskService';
import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import Categories from './pages/Categories';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [taskToEdit, setTaskToEdit] = useState(null);

  // 1. Cargar tareas iniciales
  const refreshTasks = () => {
    const updatedTasks = taskService.getTasks();
    setTasks(updatedTasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  // 2. Gestión del Tema (Dark/Light)
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // 3. Funciones de CRUD
  const handleDeleteTask = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      taskService.deleteTask(id);
      refreshTasks();
    }
  };

  const handleToggleTask = (id) => {
    taskService.toggleTaskStatus(id);
    refreshTasks();
  };

  // 4. Lógica de EDICIÓN
  const handleEditTask = (task) => {
    setTaskToEdit(task); // Cargamos la tarea en el estado
    // No hace falta instanciar el modal manualmente si usas data-bs-target en los botones,
    // pero lo dejamos por si acaso necesitas control extra.
  };

  const handleUpdateTask = (updatedTask) => {
    // Actualizamos el array de tareas
    const updatedList = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    setTasks(updatedList);
    
    // Guardamos en el LocalStorage (Asegúrate de que saveTasks acepte el array completo)
    localStorage.setItem('eldorado_tasks', JSON.stringify(updatedList));
    
    setTaskToEdit(null); // Limpiamos el editor
    refreshTasks(); // Refrescamos para estar seguros
  };

  return (
    <div className="d-flex bg-body">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow-1" style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={
            <Dashboard 
              tasks={tasks} 
              onDelete={handleDeleteTask} 
              onToggle={handleToggleTask}
              onEdit={handleEditTask} // <-- Pasamos la función
            />
          } />
          
          <Route path='/tareas' element={
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
              onEdit={handleEditTask} // <-- Pasamos la función
            />
          } />
          
          <Route path="/categorias" element={<Categories />} />
        </Routes>
      </main>

      {/* 5. Pasamos TODO al Modal */}
      <TaskModal 
        onTaskAdded={refreshTasks} 
        taskToEdit={taskToEdit} 
        onUpdate={handleUpdateTask} 
      />
    </div>
  );
}

export default App;