import { useContext } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/features/auth';
import { foodItemService } from '../api/food-item.service';
import type { FoodItems } from '../types/food-item.types';

export function useFoodItems(): UseQueryResult<FoodItems> {
  const auth = useContext(AuthContext);

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

  return foodItemsQuery;
}
