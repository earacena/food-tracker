import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

interface AuthContextType {
  token: string | undefined;
  userId: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
