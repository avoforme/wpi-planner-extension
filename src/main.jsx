import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
  </StrictMode>

)
