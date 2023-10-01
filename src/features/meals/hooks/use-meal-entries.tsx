import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { AuthContext, KeycloakContext } from '@/features/auth';
import { useToast } from '@/components/ui/toast-hook';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { mealEntryService } from '../api/meal-entry.service';
import type { MealEntries } from '../types/meal-entries.types';

export function useMealEntries(): UseQueryResult<MealEntries> {
  const auth = useContext(AuthContext);
  const keycloak = useContext(KeycloakContext);
  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userId !== undefined && auth.token !== undefined;

  const mealEntriesQuery = useQuery({
    queryKey: ['mealEntries', auth?.userId, auth?.token],
    queryFn: () =>
      mealEntryService.findMealEntriesByUserId({
        userId: auth?.userId,
        token: auth?.token,
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
          await refreshToken({
            client: keycloak?.client,
            setToken: auth?.setToken,
            logger,
          });
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
  }, [keycloak, auth?.setToken, mealEntriesQuery.error, toast]);

  return mealEntriesQuery;
}
