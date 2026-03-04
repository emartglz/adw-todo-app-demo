import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmDialog from '../components/ConfirmDialog'

const defaultProps = {
  message: '¿Eliminar la tarea "Test task"?',
  onConfirm: vi.fn(),
  onCancel: vi.fn()
}

beforeEach(() => {
  vi.clearAllMocks()
})

test('renders the message correctly', () => {
  render(<ConfirmDialog {...defaultProps} />)
  expect(screen.getByText('¿Eliminar la tarea "Test task"?')).toBeInTheDocument()
})

test('calls onConfirm when Eliminar button is clicked', () => {
  render(<ConfirmDialog {...defaultProps} />)
  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
})

test('calls onCancel when Cancelar button is clicked', () => {
  render(<ConfirmDialog {...defaultProps} />)
  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
})

test('calls onCancel when overlay is clicked', () => {
  render(<ConfirmDialog {...defaultProps} />)
  fireEvent.click(document.querySelector('.confirm-overlay'))
  expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
})
