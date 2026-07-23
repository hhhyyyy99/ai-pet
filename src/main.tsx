import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/sora/400.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource/ibm-plex-mono/400.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
