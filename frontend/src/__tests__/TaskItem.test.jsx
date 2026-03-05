import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '../components/TaskItem'

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
    isDragging: false
  })
}))

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => undefined
    }
  }
}))

const mockTask = {
  id: 1,
  title: 'Test task',
  completed: false
}

test('renders task with title', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('Test task')).toBeInTheDocument()
})

test('shows checked checkbox when task is completed', () => {
  const completedTask = { ...mockTask, completed: true }
  render(<TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} />)

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).toBeChecked()
})

test('calls onToggle when checkbox is clicked', () => {
  const mockToggle = vi.fn()
  render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('checkbox'))
  expect(mockToggle).toHaveBeenCalledWith(1)
})

test('shows confirm dialog when delete button is clicked', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  expect(screen.getByText('¿Eliminar la tarea "Test task"?')).toBeInTheDocument()
})

test('calls onDelete when delete is confirmed in dialog', () => {
  const mockDelete = vi.fn()
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={mockDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  const buttons = screen.getAllByRole('button', { name: /eliminar/i })
  fireEvent.click(buttons[buttons.length - 1])
  expect(mockDelete).toHaveBeenCalledWith(1)
})

test('does not call onDelete when dialog is cancelled', () => {
  const mockDelete = vi.fn()
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={mockDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(mockDelete).not.toHaveBeenCalled()
})

test('renders drag handle', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  const handle = document.querySelector('.drag-handle')
  expect(handle).toBeInTheDocument()
})

test('applies rainbow-border class when isNew is true', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} isNew={true} />)
  const item = document.querySelector('.task-item')
  expect(item).toHaveClass('rainbow-border')
})

test('does not apply rainbow-border class when isNew is false', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} isNew={false} />)
  const item = document.querySelector('.task-item')
  expect(item).not.toHaveClass('rainbow-border')
})

test('does not apply rainbow-border class when isNew is not passed', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  const item = document.querySelector('.task-item')
  expect(item).not.toHaveClass('rainbow-border')
})
