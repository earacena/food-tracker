import { useEffect, useState } from 'react';
import { KeycloakContext } from './keycloak-context';
import Keycloak from 'keycloak-js';
import { z } from 'zod';

interface KeycloakProviderProps {
  children: React.ReactNode;
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  const [client, setClient] = useState<Keycloak | null>(null);

  useEffect(() => {
    async function initializeKeycloak(): Promise<void> {
      const client = new Keycloak({
        url: z.string().parse(import.meta.env.VITE_KEYCLOAK_URL),
        realm: z.string().parse(import.meta.env.VITE_KEYCLOAK_REALM),
        clientId: z.string().parse(import.meta.env.VITE_KEYCLOAK_CLIENT),
      });

      await client.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      });

      setClient(client);
    }

    void initializeKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider value={{ client, setClient }}>
      {children}
    </KeycloakContext.Provider>
  );
}
