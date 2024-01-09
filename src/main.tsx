import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app.tsx';
import './index.css';
import { KeycloakProvider } from './features/auth/keycloak-provider.tsx';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './utils/firebase.ts';
import { UserCredentialProvider } from './features/auth';

// Initialize firebase
initializeApp(firebaseConfig);

const client = new QueryClient();
const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <KeycloakProvider>
      <StrictMode>
        <UserCredentialProvider>
          <BrowserRouter>
            <QueryClientProvider client={client}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </UserCredentialProvider>
      </StrictMode>
    </KeycloakProvider>,
  );
}
