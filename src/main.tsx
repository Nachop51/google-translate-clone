import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const element = document.getElementById('root')

if (element === null) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(element).render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
)
