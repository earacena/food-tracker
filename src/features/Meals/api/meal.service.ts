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

  const responseJson = await response.json()
  const mealCreateResponse = zMealCreateResponse.parse(responseJson)
  return mealCreateResponse.data.newMeal
}

export default {
  findMealsByUserId,
  create,
}