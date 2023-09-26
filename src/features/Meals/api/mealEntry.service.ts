import { AuthenticationProps, zErrorResponse } from "@/common.types"
import { zMealEntriesFetchByUserIdResponse, zMealEntryCreateResponse } from "../types/mealEntries.types"
import { AuthError } from "@/utils/errors"

interface FindMealEntriesByUserIdProps extends AuthenticationProps {}

interface CreateProps extends AuthenticationProps {
  foodItemId: number,
  mealId: number,
  quantity: number,
}

interface DeleteMealEntryProps extends AuthenticationProps {
  mealEntryId: number
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

async function deleteMealEntry ({ mealEntryId, userId, token }: DeleteMealEntryProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/mealEntries/${mealEntryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authentication: `Bearer $[token]`
    }
  })

  if (response.status === 401) {
    const errorResponse = zErrorResponse.parse(await response.json())
    throw new AuthError(errorResponse.errorMessage)
  }
}

export default {
  findMealEntriesByUserId,
  create,
  deleteMealEntry
}