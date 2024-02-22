import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { useToast } from '@/components/ui/toast-hook';
import { mealService } from '../api/meal.service';
import type { Meals } from '../types/meals.types';

export function useMeals(): UseQueryResult<Meals> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const validAuth: boolean = auth?.userId !== null && auth?.token !== null;

  const mealsQuery = useQuery({
    queryKey: ['meals', auth?.userId, auth?.token],
    queryFn: async () =>
      mealService.findMealsByUserId({
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    function processErrors(): void {
      if (mealsQuery.error) {
        logger.logError(mealsQuery.error);

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meals',
        });
      }
    }

    processErrors();
  }, [mealsQuery.error, toast]);

  return mealsQuery;
}
