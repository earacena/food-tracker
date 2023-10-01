import type { Dispatch, SetStateAction } from 'react';
import type Keycloak from 'keycloak-js';

export interface AuthContextType {
  token: string | null;
  userId: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

export interface KeycloakContextType {
  client: Keycloak | null;
  setClient: Dispatch<SetStateAction<Keycloak | null>>;
}
