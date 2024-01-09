import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/utils/logger';

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (value: SetStateAction<User | null>) => void;
  token: string | null;
  userId: string | null;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function UserCredentialProvider({
  children,
}: UserProviderProps): JSX.Element {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUserId(user.uid);
      } else {
        logger.log('User is currently logged out');
        setAuthUser(null);
        navigate('/signin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  useEffect(() => {
    async function fetchToken(): Promise<void> {
      if (authUser) {
        const fetchedToken = await auth.currentUser?.getIdToken(true);

        if (fetchedToken) {
          setToken(fetchedToken);
        }
      }
    }

    void fetchToken();
  }, [auth, authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, token, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
