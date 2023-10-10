import type { ServiceProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError } from '@/utils/errors';
import { baseUrl } from '@/config';
import type { Activities, Activity } from '../types/activity.types';
import {
  zActivitiesFetchByUserIdResponse,
  zActivityCreateResponse,
} from '../types/activity.types';

type FindActivitiesByUserIdProps = ServiceProps;

interface CreateProps extends ServiceProps {
  mealId: number;
  foodItemId: number;
  quantityInUnits: number | undefined;
  quantityInGrams: number | undefined;
}

interface DeleteActivitiesByMealIdProps extends ServiceProps {
  mealId: number;
}

interface DeleteActivityProps extends ServiceProps {
  activityId: number;
}

async function findActivitiesByUserId({
  userId,
  token,
}: FindActivitiesByUserIdProps): Promise<Activities> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/activities/user/${userId}`, {
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

  const activitiesFetchByUserIdResponse =
    zActivitiesFetchByUserIdResponse.parse(await response.json());
  return activitiesFetchByUserIdResponse.data.userActivities;
}

async function create({
  mealId,
  foodItemId,
  quantityInGrams,
  quantityInUnits,
  userId,
  token,
}: CreateProps): Promise<Activity> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    mealId: mealId === -1 ? null : mealId,
    foodItemId: foodItemId === -1 ? null : foodItemId,
    quantityInGrams: quantityInGrams ?? null,
    quantityInUnits: quantityInUnits ?? null,
    userId,
  });

  const response = await fetch(`${baseUrl}/api/activities`, {
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

  const activityCreateResponse = zActivityCreateResponse.parse(
    await response.json(),
  );
  return activityCreateResponse.data.newActivity;
}

async function deleteActivity({
  activityId,
  userId,
  token,
}: DeleteActivityProps): Promise<void> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/activities/${activityId}`, {
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

async function deleteActivitiesByMealId({
  mealId,
  userId,
  token,
}: DeleteActivitiesByMealIdProps): Promise<void> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/activities/meal/${mealId}`, {
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

export const activityService = {
  findActivitiesByUserId,
  create,
  deleteActivity,
  deleteActivitiesByMealId,
};
