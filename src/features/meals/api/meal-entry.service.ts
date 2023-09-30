import type { AuthenticationProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError } from '@/utils/errors';
import type { MealEntries, MealEntry } from '../types/meal-entries.types';
import {
  zMealEntriesFetchByUserIdResponse,
  zMealEntryCreateResponse,
} from '../types/meal-entries.types';
import { baseUrl } from '@/config';

type FindMealEntriesByUserIdProps = AuthenticationProps;

interface CreateProps extends AuthenticationProps {
  foodItemId: number;
  mealId: number;
  quantity: number;
}

interface DeleteMealEntryProps extends AuthenticationProps {
  mealEntryId: number;
}
interface DeleteMealEntriesByMealIdProps extends AuthenticationProps {
  mealId: number;
}
async function findMealEntriesByUserId({
  userId,
  token,
}: FindMealEntriesByUserIdProps): Promise<MealEntries> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(baseUrl + `/api/mealEntries/user/${userId}`, {
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

  const mealEntriesFetchByUserIdResponse =
    zMealEntriesFetchByUserIdResponse.parse(await response.json());
  return mealEntriesFetchByUserIdResponse.data.userMealEntries;
}

async function create({
  foodItemId,
  mealId,
  quantity,
  userId,
  token,
}: CreateProps): Promise<MealEntry> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    foodItemId,
    mealId,
    quantity,
    userId,
  });

  const response = await fetch('/api/mealEntries/', {
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
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(`/api/mealEntries/${mealEntryId}`, {
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

async function deleteMealEntriesByMealId({
  mealId,
  userId,
  token,
}: DeleteMealEntriesByMealIdProps): Promise<void> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(`/api/mealEntries/meal/${mealId}`, {
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

export const mealEntryService = {
  findMealEntriesByUserId,
  create,
  deleteMealEntry,
  deleteMealEntriesByMealId,
};
