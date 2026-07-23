import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { normalizeEmail, resolveWaitlistOutcome } from '../lib/waitlist'

type SubmitState = 'idle' | 'invalid' | 'loading' | 'success' | 'duplicate' | 'error'

interface WaitlistDialogProps {
  open: boolean
  onClose: () => void
}

export function WaitlistDialog({ open, onClose }: WaitlistDialogProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const seenEmails = useRef(new Set<string>())
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const priorFocus = useRef<HTMLElement | null>(null)
  const submitTimer = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    priorFocus.current = document.activeElement as HTMLElement
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      priorFocus.current?.focus()
    }
  }, [onClose, open])

  useEffect(() => {
    if (!open) {
      if (submitTimer.current !== null) {
        window.clearTimeout(submitTimer.current)
        submitTimer.current = null
      }
      setEmail('')
      setState('idle')
    }
  }, [open])

  useEffect(
    () => () => {
      if (submitTimer.current !== null) window.clearTimeout(submitTimer.current)
    },
    [],
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = normalizeEmail(email)
    const outcome = resolveWaitlistOutcome(normalized, seenEmails.current)

    if (outcome === 'invalid') {
      setState('invalid')
      inputRef.current?.focus()
      return
    }

    setState('loading')
    if (submitTimer.current !== null) window.clearTimeout(submitTimer.current)
    submitTimer.current = window.setTimeout(() => {
      if (outcome === 'success') seenEmails.current.add(normalized)
      setState(outcome)
      submitTimer.current = null
    }, 650)
  }

  const message = {
    idle: '输入邮箱，在开放试用时收到通知。',
    invalid: '请输入有效的邮箱地址。',
    loading: '正在模拟加入候补名单。',
    success: '演示完成。当前版本不会提交或保存邮箱。',
    duplicate: '演示状态：这个邮箱已经在候补名单中。',
    error: '演示状态：暂时无法提交，请稍后再试。',
  }[state]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose()
          }}
        >
          <motion.section
            ref={dialogRef}
            className="waitlist-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="icon-button dialog-close" type="button" aria-label="关闭" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="dialog-mark" aria-hidden="true">
              {state === 'success' ? <Check size={24} /> : 'a'}
            </div>
            <h2 id="waitlist-title">加入 ai-pet 候补名单</h2>
            <p>第一版表单为交互演示，不会发送或保存你的邮箱。</p>

            {state !== 'success' && (
              <form onSubmit={submit} noValidate>
                <label htmlFor="waitlist-email">邮箱</label>
                <div className="waitlist-field">
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    aria-invalid={state === 'invalid'}
                    aria-describedby="waitlist-message"
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (state !== 'idle') setState('idle')
                    }}
                  />
                  <button className="button" type="submit" disabled={state === 'loading'}>
                    {state === 'loading' ? '正在加入' : '加入候补名单'}
                  </button>
                </div>
              </form>
            )}

            <p
              id="waitlist-message"
              className={`form-message form-message-${state}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
            <p className="consent-copy">提交即表示你同意接收 ai-pet 发布通知。正式接入前不会产生订阅。</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
