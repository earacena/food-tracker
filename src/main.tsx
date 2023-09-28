import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import './index.css';
import { AuthProvider } from './features/auth/auth-provider.tsx';

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <AuthProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </AuthProvider>,
  );
}
