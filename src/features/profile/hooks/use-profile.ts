import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext, KeycloakContext } from '@/features/auth/';
import { refreshToken } from '@/features/auth/refresh-token';
import { profileService } from '@/features/profile/api/profile.service';
import { logger } from '@/utils/logger';
import { AuthError, NotFoundError } from '@/utils/errors';
import type { Profile } from '../types/profile.types';

export function useProfile(): UseQueryResult<Profile | null> {
  const auth = useContext(AuthContext);
  const keycloak = useContext(KeycloakContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validAuth: boolean =
    auth?.userId !== undefined && auth?.token !== undefined;

  const profileQuery = useQuery({
    queryKey: ['profile', auth?.userId, auth?.token],
    queryFn: () =>
      profileService.fetchProfileByUserId({
        userId: auth?.userId,
        token: auth?.token,
      }),
    retry: false,
    enabled: validAuth,
  });

  useEffect(() => {
    async function processErrors(): Promise<void> {
      if (profileQuery.error) {
        logger.logError(profileQuery.error);

        if (profileQuery.error instanceof NotFoundError) {
          navigate('/profile/form');
        } else if (
          profileQuery.error instanceof AuthError &&
          profileQuery.error.message === 'jwt expired'
        ) {
          await refreshToken({
            client: keycloak?.client,
            setToken: auth?.setToken,
            logger,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to fetch profile',
          });
        }
      }
    }

    void processErrors();
  }, [keycloak, navigate, profileQuery.error, toast]);

  return profileQuery;
}
