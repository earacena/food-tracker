import { AuthError } from '@/utils/errors';
import type { ServiceProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { baseUrl } from '@/config';
import type { FoodItem, FoodItems } from '../types/food-item.types';
import {
  zFoodItemCreateResponse,
  zFoodItemsFetchByUserIdResponse,
} from '../types/food-item.types';

interface CreateFoodItemProps extends ServiceProps {
  foodName: string;
  caloriesPerServing: number;
  servingSizeInGrams: number;
  servingSizeInUnits: number;
  searchVisibility: 'public' | 'private';
}

type FindFoodItemsByUserIdProps = ServiceProps;

interface DeleteFoodItemProps extends ServiceProps {
  foodItemId: number;
}

async function create({
  foodName,
  caloriesPerServing,
  servingSizeInGrams,
  servingSizeInUnits,
  searchVisibility,
  userId,
  token,
}: CreateFoodItemProps): Promise<FoodItem> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    foodName,
    caloriesPerServing,
    servingSizeInGrams: servingSizeInGrams !== 0 ? servingSizeInGrams : null,
    servingSizeInUnits: servingSizeInUnits !== 0 ? servingSizeInUnits : null,
    searchVisibility,
    userId,
  });

  const response = await fetch(`${baseUrl}/api/foodItems/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
      credentials: 'include',
    },
    body: requestBody,
  });

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json());
    throw new AuthError(errorResponse.errorMessage);
  }

  const foodItemCreateResponse = zFoodItemCreateResponse.parse(
    await response.json(),
  );

  return foodItemCreateResponse.data.newFoodItem;
}

async function findFoodItemsByUserId({
  userId,
  token,
}: FindFoodItemsByUserIdProps): Promise<FoodItems> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/foodItems/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
      credentials: 'include',
    },
  });

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json());
    throw new AuthError(errorResponse.errorMessage);
  }

  const userFoodItemResponse = zFoodItemsFetchByUserIdResponse.parse(
    await response.json(),
  );

  return userFoodItemResponse.data.userFoodItems;
}

async function deleteFoodItem({
  foodItemId,
  userId,
  token,
}: DeleteFoodItemProps): Promise<void> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/foodItems/${foodItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
      credentials: 'include',
    },
  });

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json());
    throw new AuthError(errorResponse.errorMessage);
  }
}

export const foodItemService = {
  create,
  findFoodItemsByUserId,
  deleteFoodItem,
};
