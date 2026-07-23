import { useRef } from 'react'
import { AlertTriangle, CircleEllipsis, ScanText, Sparkles } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { petStates } from '../content'
import { Reveal } from '../components/Reveal'

const stateIcons = {
  idle: Sparkles,
  reading: ScanText,
  working: CircleEllipsis,
  confirm: AlertTriangle,
}

export function PresenceSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['3%', '-12%'])

  return (
    <section id="presence" className="section presence-section" aria-labelledby="presence-title">
      <div className="shell section-intro">
        <Reveal>
          <h2 id="presence-title">它一直在。你一眼就知道它在做什么。</h2>
          <p>ai-pet 常驻浏览器边缘。页面切换后仍保留对话和任务，用动作与状态反馈当前进度。</p>
        </Reveal>
      </div>

      <div ref={trackRef} className="state-track-viewport">
        <motion.div className="state-track" style={reduceMotion ? undefined : { x }}>
          {petStates.map((item) => {
            const Icon = stateIcons[item.state as keyof typeof stateIcons]
            return (
              <article key={item.state} className={`state-card state-${item.state}`}>
                <div className="state-card-visual">
                  <img
                    src={item.image}
                    alt={`${item.label}状态的 Pico：${item.detail}`}
                    width={1024}
                    height={1536}
                    className="state-pet"
                  />
                  <div className="state-icon" aria-hidden="true">
                    <Icon size={19} />
                  </div>
                </div>
                <div className="state-card-copy">
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
