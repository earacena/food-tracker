import { zErrorResponse } from "@/common.types"
import { zMealEntriesFetchByUserIdResponse, zMealEntryCreateResponse } from "../types/mealEntries.types"
import { AuthError } from "@/utils/errors"

interface FindMealEntriesByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface CreateProps {
  foodItemId: number,
  mealId: number,
  quantity: number,
  userId: string | undefined
  token: string | undefined

}

async function findMealEntriesByUserId({ userId, token }: FindMealEntriesByUserIdProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/mealEntries/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer ${token}`
    }
  })

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json())
    throw new AuthError(errorResponse.errorMessage)
  }

  const responseJson = await response.json()
  const mealEntriesFetchByUserIdResponse = zMealEntriesFetchByUserIdResponse.parse(responseJson)
  return mealEntriesFetchByUserIdResponse.data.userMealEntries
}

async function create({ foodItemId, mealId, quantity, userId, token }: CreateProps) {
  if (userId == null || token == null) {
    Promise.reject()
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

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json())
    throw new AuthError(errorResponse.errorMessage)
  }

  const responseJson = await response.json()
  const mealEntryCreateResponse = zMealEntryCreateResponse.parse(responseJson)
  return mealEntryCreateResponse.data.newMealEntry
}

export default {
  findMealEntriesByUserId,
  create
}