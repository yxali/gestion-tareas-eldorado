import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom' 
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve el App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
