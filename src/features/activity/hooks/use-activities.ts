import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { activityService } from '../api/activity.service';
import type { Activities } from '../types/activity.types';
import { KeycloakContext } from '@/features/auth/keycloak-context';

export function useActivities(): UseQueryResult<Activities> {
  const auth = useContext(AuthContext);
  const keycloak = useContext(KeycloakContext);
  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userId !== undefined && auth?.token !== undefined;

  const activitiesQuery = useQuery({
    queryKey: ['activities', auth?.userId, auth?.token],
    queryFn: () =>
      activityService.findActivitiesByUserId({
        userId: auth?.userId,
        token: auth?.token,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    async function processErrors(): Promise<void> {
      if (activitiesQuery.error) {
        logger.logError(activitiesQuery.error);

        if (
          activitiesQuery.error instanceof AuthError &&
          activitiesQuery.error.message === 'jwt expired'
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
            description: 'Unable to fetch activities',
          });
        }
      }
    }

    void processErrors();
  }, [activitiesQuery.error, keycloak?.client, toast]);

  return activitiesQuery;
}
