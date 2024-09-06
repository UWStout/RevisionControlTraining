import React from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

import App from './App.jsx'
import Overlay from './Overlay.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
  </>
)
