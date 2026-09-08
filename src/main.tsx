import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css'
import {Router} from "wouter";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router base="/mittweida-app">
          <App />
      </Router>
  </StrictMode>,
)
