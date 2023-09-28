import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './app.tsx'
import './index.css'
import AuthProvider from './features/auth/auth-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
)
