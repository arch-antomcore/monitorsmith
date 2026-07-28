import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/outfit'
import '@fontsource-variable/jetbrains-mono'
import App from './App'
import ErrorBoundary from './components/UI/ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
