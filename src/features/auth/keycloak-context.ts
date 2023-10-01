import type Keycloak from 'keycloak-js';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

interface KeycloakContextType {
  client: Keycloak | null;
  setClient: Dispatch<SetStateAction<Keycloak | null>>;
}

export const KeycloakContext = createContext<KeycloakContextType | null>(null);
