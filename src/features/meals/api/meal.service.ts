import type { AuthenticationProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError } from '@/utils/errors';
import type { Meal, Meals } from '../types/meals.types';
import {
  zMealCreateResponse,
  zMealsFetchByUserIdResponse,
} from '../types/meals.types';

type FindMealsByUserIdProps = AuthenticationProps;

interface CreateMealProps extends AuthenticationProps {
  name: string;
}

interface DeleteMealProps extends AuthenticationProps {
  mealId: number;
}

async function findMealsByUserId({
  userId,
  token,
}: FindMealsByUserIdProps): Promise<Meals> {
  if (userId === undefined && token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(`/api/meals/user/${userId}`, {
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

  const mealsFetchByUserIdResponse = zMealsFetchByUserIdResponse.parse(
    await response.json(),
  );
  return mealsFetchByUserIdResponse.data.userMeals;
}

async function create({ name, userId, token }: CreateMealProps): Promise<Meal> {
  if (userId === undefined && token === undefined) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({ userId, name });

  const response = await fetch('/api/meals/', {
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

  const mealCreateResponse = zMealCreateResponse.parse(await response.json());
  return mealCreateResponse.data.newMeal;
}

async function deleteMeal({
  mealId,
  userId,
  token,
}: DeleteMealProps): Promise<void> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(`/api/meals/${mealId}`, {
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

export const mealService = {
  findMealsByUserId,
  create,
  deleteMeal,
};
