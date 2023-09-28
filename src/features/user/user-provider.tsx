import { createContext } from 'react';
import { useProfile } from '../profile';
import type { Profile } from '../profile';

export const UserContext = createContext<UserContextType | null>(null);

interface UserContextType {
  userProfile: Profile | null | undefined;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const { data: userProfile } = useProfile();

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
}
