import { AuthenticationProps, zErrorResponse } from "@/common.types"
import { zMealCreateResponse, zMealsFetchByUserIdResponse } from "../types/meals.types"
import { AuthError } from "@/utils/errors"

interface FindMealsByUserIdProps extends AuthenticationProps {}

interface CreateMealProps extends AuthenticationProps {
  name: string
}

interface DeleteMealProps extends AuthenticationProps {
  mealId: number
}

async function findMealsByUserId({ userId, token }: FindMealsByUserIdProps) {
  if (userId == null && token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/meals/user/${userId}`, {
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
  const mealsFetchByUserIdResponse = zMealsFetchByUserIdResponse.parse(responseJson)
  return mealsFetchByUserIdResponse.data.userMeals
  
}

async function create({ name, userId, token }: CreateMealProps) {
  if (userId == null && token == null) {
    Promise.reject()
  }

  const requestBody = JSON.stringify({ userId, name })

  const response = await fetch('/api/meals/', {
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
  const mealCreateResponse = zMealCreateResponse.parse(responseJson)
  return mealCreateResponse.data.newMeal
}

async function deleteMeal ({ mealId, userId, token }: DeleteMealProps)  {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/meals/${mealId}`, {
    method: 'DELETE',
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
}

export default {
  findMealsByUserId,
  create,
  deleteMeal
}