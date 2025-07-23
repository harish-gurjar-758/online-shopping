import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import index from './index'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <index />
  </StrictMode>,
)
