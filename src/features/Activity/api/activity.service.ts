import { zErrorResponse } from "@/common.types"
import { zActivitiesFetchByUserIdResponse } from "../types/activity.types"

interface FindActivitiesByUserIdProps {
  userId: string | undefined,
  token: string | undefined
}

async function findActivitiesByUserId({ userId, token }: FindActivitiesByUserIdProps) {

  if (userId === undefined || token === undefined) {
    return
  }

  const response = await fetch(`/api/activities/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    }
  })

  const responseJson = await response.json()

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else {
    const activitiesFetchByUserIdResponse = zActivitiesFetchByUserIdResponse.parse(responseJson)
    return activitiesFetchByUserIdResponse.data.userActivities
  }
}

export default {
  findActivitiesByUserId
}
