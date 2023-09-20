import { zErrorResponse } from "@/common.types"
import { zActivitiesFetchByUserIdResponse, zActivityCreateResponse } from "../types/activity.types"

interface FindActivitiesByUserIdProps {
  userId: string | undefined,
  token: string | undefined
}

interface CreateProps {
  mealId: number | undefined
  foodItemId: number | undefined
  quantity: number
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


async function create ({ mealId, foodItemId, quantity, userId, token }: CreateProps) {
  if (userId === undefined || token === undefined) {
    return 
  }

  const requestBody = {
    mealId: mealId ?? null,
    foodItemId: foodItemId ?? null,
    quantity,
    userId
  }

  const response = await fetch(`/api/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  })

  const responseJson = await response.json()

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else {
    const activityCreateResponse = zActivityCreateResponse.parse(responseJson)
    return activityCreateResponse.data.newActivity
  }
}

export default {
  findActivitiesByUserId,
  create
}
