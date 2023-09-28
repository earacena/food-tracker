import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { logger } from '@/utils/logger';
import { AuthContext } from '@/features/auth/auth-provider';
import { refreshToken } from '@/features/auth/refresh-token';
import { AuthError } from '@/utils/errors';
import { foodItemService } from '../api/food-item.service';
import type { FoodItems } from '../types/food-item.types';

export function useFoodItems(): UseQueryResult<FoodItems> {
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const validAuth: boolean =
    auth?.userInfo?.id !== undefined && auth.keycloak?.token !== undefined;

  const foodItemsQuery = useQuery({
    queryKey: ['foodItems', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: () =>
      foodItemService.findFoodItemsByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token,
      }),
    enabled: validAuth,
  });

  useEffect(() => {
    async function processErrors(): Promise<void> {
      if (foodItemsQuery.error) {
        logger.logError(foodItemsQuery.error);

        if (
          foodItemsQuery.error instanceof AuthError &&
          foodItemsQuery.error.message === 'jwt expired'
        ) {
          await refreshToken(auth?.keycloak, logger);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Unable to fetch food items',
          });
        }
      }
    }

    void processErrors();
  }, [auth?.keycloak, foodItemsQuery.error, toast]);

  return foodItemsQuery;
}
