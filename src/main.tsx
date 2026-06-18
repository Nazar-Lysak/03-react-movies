import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import App from './components/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
