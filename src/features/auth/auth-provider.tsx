import { createContext, useContext, useEffect, useState } from 'react';
import type Keycloak from 'keycloak-js';
import { KeycloakContext } from './keycloak-provider';
import type { AuthContextType } from './types/auth.types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const keycloak = useContext(KeycloakContext);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function extractAuthInfo(client: Keycloak): Promise<void> {
      setToken(client.token ?? null);

      const userInfo = await client.loadUserProfile();
      setUserId(userInfo.id ?? null);
    }

    if (keycloak?.client && keycloak.client.authenticated) {
      void extractAuthInfo(keycloak.client);
    }
  }, [keycloak]);

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
