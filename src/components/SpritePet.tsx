import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import xiaotaiSpriteSheet from '../assets/characters/xiaotai-spritesheet.webp'

const spriteAnimations = {
  idle: { row: 0, durations: [280, 110, 110, 140, 140, 320] },
  'running-right': { row: 1, durations: [120, 120, 120, 120, 120, 120, 120, 220] },
  'running-left': { row: 2, durations: [120, 120, 120, 120, 120, 120, 120, 220] },
  waving: { row: 3, durations: [140, 140, 140, 280] },
  jumping: { row: 4, durations: [140, 140, 140, 140, 280] },
  failed: { row: 5, durations: [140, 140, 140, 140, 140, 140, 140, 240] },
  waiting: { row: 6, durations: [150, 150, 150, 150, 150, 260] },
  running: { row: 7, durations: [120, 120, 120, 120, 120, 220] },
  review: { row: 8, durations: [150, 150, 150, 150, 150, 280] },
} as const

export type SpritePetState = keyof typeof spriteAnimations

interface SpritePetProps {
  state: SpritePetState
  className?: string
  label?: string
}

export function SpritePet({ state, className = '', label }: SpritePetProps) {
  const reduceMotion = useReducedMotion()
  const [frame, setFrame] = useState(0)
  const animation = spriteAnimations[state]

  useEffect(() => {
    setFrame(0)
    if (reduceMotion) return

    let currentFrame = 0
    let timer = 0

    const scheduleNextFrame = () => {
      timer = window.setTimeout(() => {
        currentFrame = (currentFrame + 1) % animation.durations.length
        setFrame(currentFrame)
        scheduleNextFrame()
      }, animation.durations[currentFrame])
    }

    scheduleNextFrame()
    return () => window.clearTimeout(timer)
  }, [animation, reduceMotion])

  return (
    <span
      className={`sprite-pet ${className}`.trim()}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        backgroundImage: `url(${xiaotaiSpriteSheet})`,
        backgroundPosition: `${(frame / 7) * 100}% ${animation.row * 10}%`,
      }}
    />
  )
}
