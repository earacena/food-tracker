import { zErrorResponse } from "@/common.types"
import { Profile, zProfileCreateResponse, zProfileFetchResponse } from "../types/profile.types"

interface FetchProfileByUserIdProps {
  userId: string | undefined,
  token: string | undefined,
}

interface CreateProfileProps {
  dailyCalorieGoal: number,
  userId: string | undefined,
  token: string | undefined,
}

async function fetchProfileByUserId ({ userId, token }: FetchProfileByUserIdProps): Promise<Profile | null> {
  if (userId === undefined || token === undefined) {
    return null
  }

  const response = await fetch(`/api/profiles/${userId}`, {
    headers: {
      accept: 'application/json',
      authentication: `Bearer ${token}`
    }
  })
  
  const responseJson = await response.json()

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else {
    const profileFetchResponse = zProfileFetchResponse.parse(responseJson)
    return profileFetchResponse.data.profile
  }
}

async function create ({ dailyCalorieGoal, userId, token }: CreateProfileProps): Promise<Profile | null> {
  if (userId === undefined || token === undefined) {
    return null
  }

  const response = await fetch(`/api/profiles/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      dailyCalorieGoal
    })
  })

  const responseJson = await response.json()

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else{
    const profileCreateResponse = zProfileCreateResponse.parse(responseJson)
    return profileCreateResponse.data.newProfile
  }
}

export default {
  fetchProfileByUserId,
  create,
}