import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { faqItems, navItems } from '../content'
import { Reveal } from '../components/Reveal'

interface ClosingSectionProps {
  onWaitlist: () => void
}

export function ClosingSection({ onWaitlist }: ClosingSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section id="terms" className="section faq-section" aria-labelledby="faq-title">
        <div className="shell faq-layout">
          <Reveal className="faq-heading">
            <span className="mono-label">QUESTIONS</span>
            <h2 id="faq-title">在它开始行动之前。</h2>
          </Reveal>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const open = openIndex === index
              return (
                <article key={item.question} className="faq-item">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown className={open ? 'faq-chevron faq-chevron-open' : 'faq-chevron'} size={21} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        className="faq-answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-cta">
          <Reveal>
            <h2>给浏览器一个始终在场、由你定义的伙伴。</h2>
            <button className="button" type="button" onClick={onWaitlist}>
              加入候补名单
              <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
        <div className="footer-brand" aria-hidden="true">ai-pet</div>
        <div className="shell footer-bottom">
          <a className="brand-link" href="#top">ai-pet</a>
          <nav aria-label="页尾导航">
            {navItems.map((item) => (
              <a key={item.id} href={item.href}>{item.label}</a>
            ))}
            <a href="#privacy">隐私</a>
            <a href="#terms">条款</a>
          </nav>
          <span>浏览器 AI 桌宠</span>
        </div>
      </footer>
    </>
  )
}
