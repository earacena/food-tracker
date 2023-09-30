import Keycloak from 'keycloak-js';
import { Dispatch, SetStateAction, createContext } from 'react';

interface KeycloakContextType {
  client: Keycloak | null;
  setClient: Dispatch<SetStateAction<Keycloak | null>>;
}

export const KeycloakContext = createContext<KeycloakContextType | null>(null);
