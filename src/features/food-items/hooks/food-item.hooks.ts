import { useContext, useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/toast-hook';
import { logger } from '@/utils/logger';
import { AuthContext, refreshToken, KeycloakContext } from '@/features/auth';
import { AuthError } from '@/utils/errors';
import { foodItemService } from '../api/food-item.service';
import type { FoodItems } from '../types/food-item.types';

export function useFoodItems(): UseQueryResult<FoodItems> {
  const keycloak = useContext(KeycloakContext);
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const validAuth: boolean = auth?.userId !== null && auth?.token !== null;

  const foodItemsQuery = useQuery({
    queryKey: ['foodItems', auth?.userId, auth?.token],
    queryFn: () =>
      foodItemService.findFoodItemsByUserId({
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
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
          await refreshToken({
            client: keycloak?.client ?? null,
            setToken: auth?.setToken ?? null,
            logger,
          });
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
  }, [keycloak, auth?.setToken, foodItemsQuery.error, toast]);

  return foodItemsQuery;
}
