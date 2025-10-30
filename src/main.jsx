import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Emperor from './pages/Emperor'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/chineseemperors' : '/'}>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/emperors/:id" element={<Emperor/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
