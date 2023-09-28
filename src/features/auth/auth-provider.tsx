import { createContext, useEffect, useState } from 'react';
import type { KeycloakProfile } from 'keycloak-js';
import Keycloak from 'keycloak-js';
import { z } from 'zod';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  keycloak: Keycloak | null;
  userInfo: KeycloakProfile | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [userInfo, setUserInfo] = useState<KeycloakProfile>();

  useEffect(() => {
    // Retrieve information of authenticated user
    async function fetchUserKeycloakInfo(client: Keycloak): Promise<void> {
      const fetchedUserInfo = await client.loadUserProfile();
      setUserInfo(fetchedUserInfo);
    }

    // Initialize Keycloak and authenticate user
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

      setKeycloak(client);

      if (client.authenticated) {
        await fetchUserKeycloakInfo(client);
      }
    }

    void initializeKeycloak();
  }, []);

  return (
    <AuthContext.Provider value={{ keycloak, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
