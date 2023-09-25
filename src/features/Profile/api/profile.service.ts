import { AuthError } from "@/utils/errors"
import { Profile, zProfileCreateResponse, zProfileFetchResponse } from "../types/profile.types"
import { zErrorResponse } from "@/common.types"

interface FetchProfileByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface CreateProfileProps {
  dailyCalorieGoal: number,
  userId: string | undefined
  token: string | undefined
}

export class NotFoundError extends Error {}

async function fetchProfileByUserId({ userId, token }: FetchProfileByUserIdProps): Promise<Profile | null> {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/profiles/${userId}`, {
    headers: {
      accept: 'application/json',
      authentication: `Bearer ${token}`
    }
  })

  if (response.status === 404) {
    throw new NotFoundError()
  }

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json())
    throw new AuthError(errorResponse.errorMessage)
  }

  const responseJson = await response.json()
  const profileFetchResponse = zProfileFetchResponse.parse(responseJson)
  return profileFetchResponse.data.userProfile

}

async function create({ dailyCalorieGoal, userId, token }: CreateProfileProps): Promise<Profile | null> {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const requestBody = JSON.stringify({
    userId,
    dailyCalorieGoal
  })

  const response = await fetch(`/api/profiles/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    },
    body: requestBody
  })

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json())
    throw new AuthError(errorResponse.errorMessage)
  }

  const responseJson = await response.json()
  const profileCreateResponse = zProfileCreateResponse.parse(responseJson)
  return profileCreateResponse.data.newProfile
}

export default {
  fetchProfileByUserId,
  create,
}