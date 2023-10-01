import { useContext, useEffect, useState } from 'react';
import type Keycloak from 'keycloak-js';
import { AuthContext } from './auth-context';
import { KeycloakContext } from './keycloak-context';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const keycloak = useContext(KeycloakContext);
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function extractAuthInfo(client: Keycloak): Promise<void> {
      setToken(client.token);

      const userInfo = await client.loadUserProfile();
      setUserId(userInfo.id);
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
