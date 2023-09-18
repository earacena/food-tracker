import { zErrorResponse } from "@/common.types"
import { zMealEntriesFetchByUserIdResponse } from "../types/mealEntries.types"

interface FindMealEntriesByUserIdProps {
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

export default {
  findMealEntriesByUserId
}