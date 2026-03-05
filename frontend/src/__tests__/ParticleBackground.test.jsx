import { render } from '@testing-library/react'
import ParticleBackground from '../components/ParticleBackground'

test('renders a canvas element', () => {
  const { container } = render(<ParticleBackground />)
  const canvas = container.querySelector('canvas')
  expect(canvas).toBeInTheDocument()
})

test('canvas has fixed positioning and z-index -1', () => {
  const { container } = render(<ParticleBackground />)
  const canvas = container.querySelector('canvas')
  expect(canvas).toHaveStyle({
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '-1',
  })
})

test('component mounts and unmounts without errors', () => {
  const { unmount } = render(<ParticleBackground />)
  expect(() => unmount()).not.toThrow()
})
