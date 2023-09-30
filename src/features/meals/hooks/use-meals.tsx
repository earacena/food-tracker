import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { mealService } from '../api/meal.service';
import type { Meals } from '../types/meals.types';
import { KeycloakContext } from '@/features/auth';

export function useMeals(): UseQueryResult<Meals> {
  const auth = useContext(AuthContext);
  const keycloak = useContext(KeycloakContext);
  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userId !== undefined && auth?.token !== undefined;

  const mealsQuery = useQuery({
    queryKey: ['meals', auth?.userId, auth?.token],
    queryFn: async () =>
      mealService.findMealsByUserId({
        userId: auth?.userId,
        token: auth?.token,
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
          await refreshToken({
            client: keycloak?.client,
            setToken: auth?.setToken,
            logger,
          });
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
  }, [keycloak, mealsQuery.error, toast]);

  return mealsQuery;
}
