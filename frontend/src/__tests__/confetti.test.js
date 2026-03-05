import { fireConfetti } from '../utils/confetti'

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}))

import confetti from 'canvas-confetti'

test('fireConfetti calls canvas-confetti twice', () => {
  fireConfetti()
  expect(confetti).toHaveBeenCalledTimes(2)
})

test('fireConfetti fires from left side', () => {
  confetti.mockClear()
  fireConfetti()
  expect(confetti).toHaveBeenCalledWith(expect.objectContaining({
    angle: 60,
    origin: expect.objectContaining({ x: 0 }),
  }))
})

test('fireConfetti fires from right side', () => {
  confetti.mockClear()
  fireConfetti()
  expect(confetti).toHaveBeenCalledWith(expect.objectContaining({
    angle: 120,
    origin: expect.objectContaining({ x: 1 }),
  }))
})
