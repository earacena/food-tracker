import type { ServiceProps } from '@/common.types';
import { zErrorResponse } from '@/common.types';
import { AuthError, NotFoundError } from '@/utils/errors';
import { logger } from '@/utils/logger';
import { baseUrl } from '@/config';
import type { Profile } from '../types/profile.types';
import {
  zProfileCreateResponse,
  zProfileFetchResponse,
} from '../types/profile.types';

type FetchProfileByUserIdProps = ServiceProps;

interface CreateProfileProps extends ServiceProps {
  dailyCalorieGoal: number;
}

async function fetchProfileByUserId({
  userId,
  token,
}: FetchProfileByUserIdProps): Promise<Profile | null> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const response = await fetch(`${baseUrl}/api/profiles/${userId}`, {
    headers: {
      accept: 'application/json',
      authentication: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    throw new NotFoundError();
  }

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json());
    throw new AuthError(errorResponse.errorMessage);
  }

  const profileFetchResponse = zProfileFetchResponse.parse(
    await response.json(),
  );
  return profileFetchResponse.data.userProfile;
}

async function create({
  dailyCalorieGoal,
  userId,
  token,
}: CreateProfileProps): Promise<Profile | null> {
  if (userId === null || token === null) {
    void Promise.reject();
  }

  const requestBody = JSON.stringify({
    userId,
    dailyCalorieGoal,
  });

  const response = await fetch(`${baseUrl}/api/profiles/`, {
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

  const profileCreateResponse = zProfileCreateResponse.parse(
    await response.json(),
  );
  logger.log(JSON.stringify(profileCreateResponse));
  return profileCreateResponse.data.newProfile;
}

export const profileService = {
  fetchProfileByUserId,
  create,
};
