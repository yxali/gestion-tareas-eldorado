import { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import TaskModal from './components/TaskModal';
import { taskService } from './services/taskService';
import './styles/main.scss';

function App() {
  const [tasks, setTasks] = useState([]);

  // Función para traer las tareas frescas del LocalStorage
  const refreshTasks = () => {
    const updatedTasks = taskService.getTasks();
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    taskService.deleteTask(id); // Borra de la "bodega"
    refreshTasks();            // Avisa a la pantalla que se actualice
  };

  useEffect(() => {
    refreshTasks();
  }, []);
  return (
    <div className="d-flex">
      {/* Componente de Navegación Lateral */}
      <Sidebar />
      <main className="flex-grow-1 bg-dark text-white" style={{ minHeight: '100vh' }}>
        <Dashboard tasks={tasks} onDelete={handleDeleteTask} />
        </main>
      <TaskModal onTaskAdded={refreshTasks} />
    </div>
  );

}

export default App;