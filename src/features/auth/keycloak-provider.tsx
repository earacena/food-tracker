import { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import { z } from 'zod';
import { KeycloakContext } from './keycloak-context';

interface KeycloakProviderProps {
  children: React.ReactNode;
}

export function KeycloakProvider({
  children,
}: KeycloakProviderProps): JSX.Element {
  const [client, setClient] = useState<Keycloak | null>(null);

  useEffect(() => {
    async function initializeKeycloak(): Promise<void> {
      const keycloakClient = new Keycloak({
        url: z.string().parse(import.meta.env.VITE_KEYCLOAK_URL),
        realm: z.string().parse(import.meta.env.VITE_KEYCLOAK_REALM),
        clientId: z.string().parse(import.meta.env.VITE_KEYCLOAK_CLIENT),
      });

      await keycloakClient.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      });

      setClient(keycloakClient);
    }

    void initializeKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider value={{ client, setClient }}>
      {children}
    </KeycloakContext.Provider>
  );
}
