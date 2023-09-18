import { zErrorResponse } from "@/common.types"
import { zMealCreateResponse, zMealsFetchByUserIdResponse } from "../types/meals.types"

interface FindMealsByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface CreateMealProps {
  name: string
  userId: string | undefined
  token: string | undefined
}

async function findMealsByUserId({ userId, token }: FindMealsByUserIdProps) {

  if (userId === undefined || token === undefined) {
    return
  }

  const response = await fetch(`/api/meals/user/${userId}`, {
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
    const mealsFetchByUserIdResponse = zMealsFetchByUserIdResponse.parse(responseJson)
    return mealsFetchByUserIdResponse.data.userMeals
  }
}

async function create({ name, userId, token }: CreateMealProps) {
  if (userId === undefined || token === undefined) {
    return
  }

  const requestBody = JSON.stringify({ name })

  const response = await fetch('/api/meals/', {
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
    const mealCreateResponse = zMealCreateResponse.parse(responseJson)
    return mealCreateResponse.data.newMeal
  }
}

export default {
  findMealsByUserId,
  create,
}