import type { ReactNode } from 'react'
import { LockKeyhole } from 'lucide-react'

interface BrowserFrameProps {
  children: ReactNode
  title: string
  url?: string
  className?: string
}

export function BrowserFrame({ children, title, url = 'demo.ai-pet.app', className = '' }: BrowserFrameProps) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-chrome" aria-hidden="true">
        <div className="browser-controls">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-tab">{title}</div>
        <div className="browser-spacer" />
      </div>
      <div className="browser-address" aria-hidden="true">
        <LockKeyhole size={13} strokeWidth={1.75} />
        <span>{url}</span>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  )
}
