import { zErrorResponse } from "@/common.types"
import { zMealEntriesFetchByUserIdResponse, zMealEntryCreateResponse } from "../types/mealEntries.types"

interface FindMealEntriesByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface CreateProps {
  foodItemId: number,
  mealId: number,
  quantity: number,
  userId: string | undefined,
  token: string | undefined

}

async function findMealEntriesByUserId({ userId, token }: FindMealEntriesByUserIdProps) {
  if (userId === undefined || token === undefined) {
    return
  }

  const response = await fetch(`/api/mealEntries/user/${userId}`, {
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
    const mealEntriesFetchByUserIdResponse = zMealEntriesFetchByUserIdResponse.parse(responseJson)
    return mealEntriesFetchByUserIdResponse.data.userMealEntries
  }
}

async function create({ foodItemId, mealId, quantity, userId, token }: CreateProps) {
  if (userId === undefined || token === undefined) {
    return
  }

  const requestBody = JSON.stringify({
    foodItemId,
    mealId,
    quantity,
    userId
  })

  const response = await fetch('/api/mealEntries/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    },
    body: requestBody
  })

  const responseJson = await response.json()

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else {
    const mealEntryCreateResponse = zMealEntryCreateResponse.parse(responseJson)
    return mealEntryCreateResponse.data.newMealEntry
  }
}

export default {
  findMealEntriesByUserId,
  create
}