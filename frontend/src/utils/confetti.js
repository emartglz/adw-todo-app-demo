import confetti from 'canvas-confetti'

export function fireConfetti() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

  confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 45,
    angle: 60,
    origin: { x: 0, y: 0.6 },
    colors,
  })

  confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 45,
    angle: 120,
    origin: { x: 1, y: 0.6 },
    colors,
  })
}
