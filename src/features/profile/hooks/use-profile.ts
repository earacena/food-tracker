import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '@/features/auth/auth-provider';
import { refreshToken } from '@/features/auth/refresh-token';
import { profileService } from '@/features/profile/api/profile.service';
import { logger } from '@/utils/logger';
import { AuthError, NotFoundError } from '@/utils/errors';
import type { Profile } from '../types/profile.types';

export function useProfile(): UseQueryResult<Profile | null> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const validAuth: boolean =
    auth?.userInfo?.id !== undefined && auth.keycloak?.token !== undefined;

  const profileQuery = useQuery({
    queryKey: ['profile', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: () =>
      profileService.fetchProfileByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token,
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
          await refreshToken(auth?.keycloak, logger);
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
  }, [auth?.keycloak, navigate, profileQuery.error, toast]);

  return profileQuery;
}
