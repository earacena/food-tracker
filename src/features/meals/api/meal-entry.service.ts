import type { ServiceProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError } from '@/utils/errors';
import { baseUrl } from '@/config';
import type { MealEntries, MealEntry } from '../types/meal-entries.types';
import {
  zMealEntriesFetchByUserIdResponse,
  zMealEntryCreateResponse,
} from '../types/meal-entries.types';

type FindMealEntriesByUserIdProps = ServiceProps;

interface CreateProps extends ServiceProps {
  foodItemId: number;
  mealId: number;
  quantityInUnits: number;
  quantityInGrams: number;
}

interface DeleteMealEntryProps extends ServiceProps {
  mealEntryId: number;
}
interface DeleteMealEntriesByMealIdProps extends ServiceProps {
  mealId: number;
}
async function findMealEntriesByUserId({
  userId,
  token,
}: FindMealEntriesByUserIdProps): Promise<MealEntries> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/mealEntries/user/${userId}`, {
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

  const mealEntriesFetchByUserIdResponse =
    zMealEntriesFetchByUserIdResponse.parse(await response.json());
  return mealEntriesFetchByUserIdResponse.data.userMealEntries;
}

async function create({
  foodItemId,
  mealId,
  quantityInGrams,
  quantityInUnits,
  userId,
  token,
}: CreateProps): Promise<MealEntry> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    foodItemId: foodItemId === -1 ? null : foodItemId,
    mealId: mealId === -1 ? null : mealId,
    quantityInGrams: quantityInGrams === 0 ? null : quantityInGrams,
    quantityInUnits: quantityInUnits === 0 ? null : quantityInUnits,
    userId,
  });

  const response = await fetch('/api/mealEntries/', {
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

  const mealEntryCreateResponse = zMealEntryCreateResponse.parse(
    await response.json(),
  );
  return mealEntryCreateResponse.data.newMealEntry;
}

async function deleteMealEntry({
  mealEntryId,
  userId,
  token,
}: DeleteMealEntryProps): Promise<void> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`/api/mealEntries/${mealEntryId}`, {
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

async function deleteMealEntriesByMealId({
  mealId,
  userId,
  token,
}: DeleteMealEntriesByMealIdProps): Promise<void> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`/api/mealEntries/meal/${mealId}`, {
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

export const mealEntryService = {
  findMealEntriesByUserId,
  create,
  deleteMealEntry,
  deleteMealEntriesByMealId,
};
