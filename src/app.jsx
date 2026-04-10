import { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import TaskModal from './components/TaskModal';
import { taskService } from './services/taskService';
import './styles/main.scss';

function App() {
  const [tasks, setTasks] = useState([]);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Función para traer las tareas frescas del LocalStorage
  const refreshTasks = () => {
    const updatedTasks = taskService.getTasks();
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleToggleTask = (id) => {
    taskService.toggleTaskStatus(id);
    setTasks(taskService.getTasks())
  };

  // 3. Aplicar el tema al HTML cada vez que cambie
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleDeleteTask = (id) => {
    taskService.deleteTask(id);
    refreshTasks();
  };

  return (
    <div className="d-flex bg-body">
      {/* 4. Pasamos el tema y la función al Sidebar */}
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow-1" style={{ minHeight: '100vh' }}>
        <Dashboard tasks={tasks} onDelete={handleDeleteTask} onToggle={handleToggleTask}/>
      </main>
      <TaskModal onTaskAdded={refreshTasks} />
    </div>
  );
}

export default App;