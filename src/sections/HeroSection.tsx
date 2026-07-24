import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowRight, Check, Play } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { petStates } from '../content'
import { BrowserFrame } from '../components/BrowserFrame'
import { SpritePet } from '../components/SpritePet'

interface HeroSectionProps {
  onWaitlist: () => void
}

const heroFeedbackStates = petStates.slice(0, 4)

const petFeedbackMotion = {
  idle: { x: 0, y: 0, rotate: 0, scale: 1 },
  reading: { x: -4, y: -8, rotate: -1.5, scale: 1.015 },
  working: { x: 7, y: -3, rotate: 1.5, scale: 1.01 },
  confirm: { x: 0, y: 6, rotate: 0, scale: 0.99 },
}

export function HeroSection({ onWaitlist }: HeroSectionProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [feedbackIndex, setFeedbackIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 120, damping: 20 })
  const y = useSpring(rawY, { stiffness: 120, damping: 20 })
  const feedback = heroFeedbackStates[feedbackIndex]
  const feedbackMotion = petFeedbackMotion[feedback.state as keyof typeof petFeedbackMotion]

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setFeedbackIndex((current) => (current + 1) % heroFeedbackStates.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !sceneRef.current) return
    const rect = sceneRef.current.getBoundingClientRect()
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 24)
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 18)
  }

  const resetPointer = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div id="nav-sentinel" className="nav-sentinel" aria-hidden="true" />
      <div className="hero-brand-wrap">
        <motion.h1
          id="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          ai-pet
        </motion.h1>
      </div>

      <div
        ref={sceneRef}
        className="hero-scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <BrowserFrame title="研究资料" className="hero-browser">
          <div className="hero-page-copy" aria-hidden="true">
            <span className="page-kicker">PRODUCT NOTES</span>
            <strong>切换页面，它也还在。</strong>
            <p>固定在浏览器边缘，根据当前页面抬头、思考、执行，或停下来等待确认。</p>
            <mark>小钛正在读取你选中的内容</mark>
          </div>
          <div className="hero-chat-panel" aria-label="ai-pet 页面对话">
            <div className="chat-panel-head">
              <span className="chat-pet-dot" />
              <span>小钛</span>
              <span className="model-label">Custom / atlas-3</span>
            </div>
            <div className="chat-context">已读取当前页面与选中文本</div>
            <div className="chat-bubble">这段内容的核心是任务不中断。需要我继续整理吗？</div>
            <div className="chat-task-line">
              <Check size={14} /> 页面内容已理解
            </div>
          </div>
        </BrowserFrame>

        <motion.div className="hero-pet-anchor" style={{ x, y }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={feedback.state}
              className="hero-pet-motion"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, ...feedbackMotion }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpritePet
                state={feedback.spriteState}
                className="hero-pet"
                label={`小钛正在${feedback.label}：${feedback.detail}`}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="hero-status" aria-label="桌宠常驻浏览器状态">
          <span className="status-light" />
          <span className="hero-status-copy">
            <small>常驻当前标签页</small>
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={feedback.state}
                initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {feedback.label}：{feedback.detail}
              </motion.strong>
            </AnimatePresence>
          </span>
        </div>
      </div>

      <div className="hero-bottom shell">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <h2>始终在浏览器里的 AI 桌宠。</h2>
          <p>它会待机、思考、提醒和执行，用动作与状态回应你。角色和模型都由你定义。</p>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
        >
          <button className="button" type="button" onClick={onWaitlist}>
            加入候补名单
            <ArrowRight size={18} />
          </button>
          <a className="button button-ghost" href="#presence">
            <Play size={17} fill="currentColor" />
            查看工作方式
          </a>
        </motion.div>
      </div>
    </section>
  )
}
