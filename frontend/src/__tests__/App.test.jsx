import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import App from '../App'
import { fetchTasks, updateTask, createTask } from '../services/api'

// Mock del servicio API
vi.mock('../services/api', () => ({
  fetchTasks: vi.fn().mockResolvedValue([]),
  createTask: vi.fn().mockResolvedValue({ id: 99, title: 'New task', completed: false }),
  updateTask: vi.fn().mockResolvedValue({}),
  deleteTask: vi.fn(),
  reorderTasks: vi.fn().mockResolvedValue([])
}))

test('renders Todo List heading', () => {
  render(<App />)
  const heading = screen.getByRole('heading', { name: /todo list/i })
  expect(heading).toBeInTheDocument()
})

test('renders task form', () => {
  render(<App />)
  expect(screen.getByPlaceholderText(/nueva tarea/i)).toBeInTheDocument()
})

test('renders task list', () => {
  render(<App />)
  expect(screen.getByText(/no hay tareas/i)).toBeInTheDocument()
})

test('toggle calls updateTask with completed: true when task is not completed', async () => {
  fetchTasks.mockResolvedValue([{ id: 1, title: 'Test task', completed: false }])

  render(<App />)
  const checkbox = await screen.findByRole('checkbox')
  fireEvent.click(checkbox)

  await waitFor(() => {
    expect(updateTask).toHaveBeenCalledWith(1, { completed: true })
  })
})

test('toggle calls updateTask with completed: false when task is completed', async () => {
  fetchTasks.mockResolvedValue([{ id: 1, title: 'Test task', completed: true }])

  render(<App />)
  const checkbox = await screen.findByRole('checkbox')
  fireEvent.click(checkbox)

  await waitFor(() => {
    expect(updateTask).toHaveBeenCalledWith(1, { completed: false })
  })
})

test('new task gets rainbow-border class after creation', async () => {
  fetchTasks.mockResolvedValue([])
  createTask.mockResolvedValue({ id: 99, title: 'New task', completed: false })

  render(<App />)

  const input = screen.getByPlaceholderText(/nueva tarea/i)
  fireEvent.change(input, { target: { value: 'New task' } })
  fireEvent.submit(input.closest('form'))

  await screen.findByText('New task')

  const item = document.querySelector('.task-item')
  expect(item).toHaveClass('rainbow-border')
})

test('rainbow-border class is removed after 3 seconds', async () => {
  vi.useFakeTimers()
  fetchTasks.mockResolvedValue([])
  createTask.mockResolvedValue({ id: 99, title: 'New task', completed: false })

  render(<App />)

  const input = screen.getByPlaceholderText(/nueva tarea/i)
  fireEvent.change(input, { target: { value: 'New task' } })

  await act(async () => {
    fireEvent.submit(input.closest('form'))
  })

  expect(screen.getByText('New task')).toBeInTheDocument()
  expect(document.querySelector('.task-item')).toHaveClass('rainbow-border')

  act(() => {
    vi.advanceTimersByTime(3000)
  })

  expect(document.querySelector('.task-item')).not.toHaveClass('rainbow-border')

  vi.useRealTimers()
})
