import type { AuthenticationProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError } from '@/utils/errors';
import type { Activities, Activity } from '../types/activity.types';
import {
  zActivitiesFetchByUserIdResponse,
  zActivityCreateResponse,
} from '../types/activity.types';

type FindActivitiesByUserIdProps = AuthenticationProps;

interface CreateProps extends AuthenticationProps {
  mealId: number | undefined;
  foodItemId: number | undefined;
  quantityInUnits: number | undefined;
  quantityInGrams: number | undefined;
}

async function findActivitiesByUserId({
  userId,
  token,
}: FindActivitiesByUserIdProps): Promise<Activities> {
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const response = await fetch(`/api/activities/user/${userId}`, {
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
  if (userId === undefined || token === undefined) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    mealId: mealId ?? null,
    foodItemId: foodItemId ?? null,
    quantityInGrams: quantityInGrams ?? null,
    quantityInUnits: quantityInUnits ?? null,
    userId,
  });

  const response = await fetch(`/api/activities`, {
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

export const activityService = {
  findActivitiesByUserId,
  create,
};
