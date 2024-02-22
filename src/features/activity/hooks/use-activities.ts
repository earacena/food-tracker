import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { useToast } from '@/components/ui/toast-hook';
import { activityService } from '../api/activity.service';
import type { Activities } from '../types/activity.types';

export function useActivities(): UseQueryResult<Activities> {
  const auth = useContext(AuthContext);
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
    function processErrors(): void {
      if (activitiesQuery.error) {
        logger.logError(activitiesQuery.error);

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch activities',
        });
      }
    }

    processErrors();
  }, [activitiesQuery.error, toast]);

  return activitiesQuery;
}
