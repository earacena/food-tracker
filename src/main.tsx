import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app.tsx';
import './index.css';
import { AuthProvider } from './features/auth/auth-provider.tsx';
import { KeycloakProvider } from './features/auth/keycloak-provider.tsx';

const client = new QueryClient();
const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <KeycloakProvider>
      <StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <QueryClientProvider client={client}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </AuthProvider>
      </StrictMode>
    </KeycloakProvider>,
  );
}
