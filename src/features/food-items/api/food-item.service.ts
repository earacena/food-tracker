import { AuthError } from '@/utils/errors';
import type { AuthenticationProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import type { FoodItem, FoodItems } from '../types/food-item.types';
import {
  zFoodItemCreateResponse,
  zFoodItemsFetchByUserIdResponse,
} from '../types/food-item.types';
import { baseUrl } from '@/config';

interface CreateFoodItemProps extends AuthenticationProps {
  foodName: string;
  caloriesPerServing: number;
  servingSizeInGrams: number;
  searchVisibility: 'public' | 'private';
}

type FindFoodItemsByUserIdProps = AuthenticationProps;

interface DeleteFoodItemProps extends AuthenticationProps {
  foodItemId: number;
}

async function create({
  foodName,
  caloriesPerServing,
  servingSizeInGrams,
  searchVisibility,
  userId,
  token,
}: CreateFoodItemProps): Promise<FoodItem> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    foodName,
    caloriesPerServing,
    servingSizeInGrams,
    searchVisibility,
    userId,
  });

  const response = await fetch(baseUrl + '/api/foodItems/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
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
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(baseUrl + `/api/foodItems/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
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
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(baseUrl + `/api/foodItems/${foodItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`,
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
