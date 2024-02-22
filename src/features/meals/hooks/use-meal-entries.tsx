import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/features/auth';
import { logger } from '@/utils/logger';
import { useToast } from '@/components/ui/toast-hook';
import { mealEntryService } from '../api/meal-entry.service';
import type { MealEntries } from '../types/meal-entries.types';

export function useMealEntries(): UseQueryResult<MealEntries> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const validAuth: boolean = auth?.userId !== null && auth?.token !== null;

  const mealEntriesQuery = useQuery({
    queryKey: ['mealEntries', auth?.userId, auth?.token],
    queryFn: () =>
      mealEntryService.findMealEntriesByUserId({
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    function processErrors(): void {
      if (mealEntriesQuery.error) {
        logger.logError(mealEntriesQuery.error);

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meal entries',
        });
      }
    }

    processErrors();
  }, [mealEntriesQuery.error, toast]);

  return mealEntriesQuery;
}
