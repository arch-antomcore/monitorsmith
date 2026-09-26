import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/fonts.css'
import '@fontsource/chakra-petch/latin-500.css'
import '@fontsource/chakra-petch/latin-600.css'
import '@fontsource/chakra-petch/latin-700.css'
import App from './App'
import ErrorBoundary from './components/UI/ErrorBoundary'
import './index.css'
import 'lenis/dist/lenis.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
