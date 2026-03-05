import { useState, useEffect, useRef } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { fetchTasks, createTask, updateTask, deleteTask, reorderTasks } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskId, setNewTaskId] = useState(null)
  const newTaskTimerRef = useRef(null)

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const data = await fetchTasks()
    setTasks(data)
  }

  const handleCreateTask = async (title) => {
    const newTask = await createTask(title)
    setTasks([...tasks, newTask])
    if (newTaskTimerRef.current) clearTimeout(newTaskTimerRef.current)
    setNewTaskId(newTask.id)
    newTaskTimerRef.current = setTimeout(() => setNewTaskId(null), 3000)
  }

  const handleToggleTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    await updateTask(id, { completed: !task.completed })
  }

  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleReorderTasks = async (taskIds) => {
    const reordered = taskIds.map(id => tasks.find(t => t.id === id))
    setTasks(reordered)
    await reorderTasks(taskIds)
  }

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TaskForm onTaskCreated={handleCreateTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onReorder={handleReorderTasks}
        newTaskId={newTaskId}
      />
    </div>
  )
}

export default App
