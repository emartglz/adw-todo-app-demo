import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 100
const PARTICLE_COLOR = 'rgba(52, 152, 219, 0.6)'
const LINE_COLOR_BASE = '52, 152, 219'
const CONNECTION_DISTANCE = 120
const MOUSE_ATTRACTION_DISTANCE = 150
const MAX_SPEED = 2

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * MAX_SPEED,
    vy: (Math.random() - 0.5) * MAX_SPEED,
    radius: 1 + Math.random() * 2,
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    )

    const mouse = { x: null, y: null }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let animationId

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const p of particles) {
        // Mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_ATTRACTION_DISTANCE && dist > 0) {
            const force = (MOUSE_ATTRACTION_DISTANCE - dist) / MOUSE_ATTRACTION_DISTANCE
            p.vx += (dx / dist) * force * 0.3
            p.vy += (dy / dist) * force * 0.3
          }
        }

        // Limit speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1
        if (p.y < p.radius || p.y > canvas.height - p.radius) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = PARTICLE_COLOR
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const opacity = 1 - dist / CONNECTION_DISTANCE
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${LINE_COLOR_BASE}, ${opacity * 0.5})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  )
}
