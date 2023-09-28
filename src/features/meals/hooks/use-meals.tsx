import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '@/features/auth/auth-provider';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { mealService } from '../api/meal.service';
import type { Meals } from '../types/meals.types';

export function useMeals(): UseQueryResult<Meals> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();
  const validAuth: boolean =
    auth?.userInfo?.id !== undefined && auth.keycloak?.token !== undefined;

  const mealsQuery = useQuery({
    queryKey: ['meals', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () =>
      mealService.findMealsByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    async function processErrors(): Promise<void> {
      if (mealsQuery.error) {
        logger.logError(mealsQuery.error);

        if (
          mealsQuery.error instanceof AuthError &&
          mealsQuery.error.message === 'jwt expired'
        ) {
          await refreshToken(auth?.keycloak, logger);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to fetch meals',
          });
        }
      }
    }

    void processErrors();
  }, [auth?.keycloak, mealsQuery.error, toast]);

  return mealsQuery;
}
