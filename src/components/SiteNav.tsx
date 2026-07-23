import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { navItems } from '../content'

interface SiteNavProps {
  onWaitlist: () => void
}

export function SiteNav({ onWaitlist }: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-nav ${scrolled ? 'site-nav-scrolled' : ''}`}>
      <a className="brand-link" href="#top" aria-label="ai-pet 首页" onClick={closeMenu}>
        ai-pet
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={activeSection === item.id ? 'nav-link nav-link-active' : 'nav-link'}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button className="button button-small nav-cta" type="button" onClick={onWaitlist}>
        加入候补名单
      </button>

      <button
        className="icon-button menu-button"
        type="button"
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="移动端导航"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="button mobile-primary"
              type="button"
              onClick={() => {
                closeMenu()
                onWaitlist()
              }}
            >
              加入候补名单
            </button>
            {navItems.map((item) => (
              <a key={item.id} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
