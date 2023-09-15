import { zErrorResponse } from "@/common.types"
import { Profile, zProfile } from "../types/profile.types"

interface FetchProfileByUserIdProps {
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
    }
  )
  
  const responseJson = await response.json()
  console.log(responseJson)
  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    console.log(errorResponse.errorMessage)
  } else {
    const fetchedUserProfile = zProfile.parse(responseJson)
    return fetchedUserProfile
  }
}

export default {
  fetchProfileByUserId,
}