import { zActivitiesFetchByUserIdResponse, zActivityCreateResponse } from "../types/activity.types"

interface FindActivitiesByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface CreateProps {
  mealId: number | undefined
  foodItemId: number | undefined
  quantityInUnits: number | undefined
  quantityInGrams: number | undefined
  userId: string | undefined
  token: string | undefined
}

async function findActivitiesByUserId({ userId, token }: FindActivitiesByUserIdProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/activities/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    }
  })

  const responseJson = await response.json()
  const activitiesFetchByUserIdResponse = zActivitiesFetchByUserIdResponse.parse(responseJson)
  return activitiesFetchByUserIdResponse.data.userActivities
}


async function create ({ mealId, foodItemId, quantityInGrams, quantityInUnits, userId, token }: CreateProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const requestBody = JSON.stringify({
    mealId: mealId ?? null,
    foodItemId: foodItemId ?? null,
    quantityInGrams: quantityInGrams ?? null,
    quantityInUnits: quantityInUnits ?? null,
    userId
  })

  const response = await fetch(`/api/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    },
    body: requestBody
  })

  const responseJson = await response.json()
  const activityCreateResponse = zActivityCreateResponse.parse(responseJson)
  return activityCreateResponse.data.newActivity
}

export default {
  findActivitiesByUserId,
  create
}
