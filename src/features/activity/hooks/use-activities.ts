import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '@/features/auth/auth-provider';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { activityService } from '../api/activity.service';
import type { Activities } from '../types/activity.types';

export function useActivities(): UseQueryResult<Activities> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userInfo?.id !== undefined && auth.keycloak?.token !== undefined;

  const activitiesQuery = useQuery({
    queryKey: ['activities', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: () =>
      activityService.findActivitiesByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token,
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
          await refreshToken(auth?.keycloak, logger);
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
  }, [activitiesQuery.error, auth?.keycloak, toast]);

  return activitiesQuery;
}
