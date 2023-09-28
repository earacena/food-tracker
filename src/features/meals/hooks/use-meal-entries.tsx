import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/features/auth/auth-provider';
import { useToast } from '@/components/ui/toast-hook';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { mealEntryService } from '../api/meal-entry.service';
import type { MealEntries } from '../types/meal-entries.types';

export function useMealEntries(): UseQueryResult<MealEntries> {
  const auth = useContext(AuthContext);

  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userInfo?.id !== undefined && auth.keycloak?.token !== undefined;

  const mealEntriesQuery = useQuery({
    queryKey: ['mealEntries', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: () =>
      mealEntryService.findMealEntriesByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    async function processErrors(): Promise<void> {
      if (mealEntriesQuery.error) {
        logger.logError(mealEntriesQuery.error);

        if (
          mealEntriesQuery.error instanceof AuthError &&
          mealEntriesQuery.error.message === 'jwt expired'
        ) {
          await refreshToken(auth?.keycloak, logger);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to fetch meal entries',
          });
        }
      }
    }

    void processErrors();
  }, [auth?.keycloak, mealEntriesQuery.error, toast]);

  return mealEntriesQuery;
}
