import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext, KeycloakContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { activityService } from '../api/activity.service';
import type { Activities } from '../types/activity.types';

export function useActivities(): UseQueryResult<Activities> {
  const auth = useContext(AuthContext);
  const keycloak = useContext(KeycloakContext);
  const { toast } = useToast();

  const validAuth: boolean = auth?.userId !== null && auth?.token !== null;

  const activitiesQuery = useQuery({
    queryKey: ['activities', auth?.userId, auth?.token],
    queryFn: () =>
      activityService.findActivitiesByUserId({
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
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
            client: keycloak?.client ?? null,
            setToken: auth?.setToken ?? null,
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
  }, [activitiesQuery.error, keycloak?.client, auth?.setToken, toast]);

  return activitiesQuery;
}
