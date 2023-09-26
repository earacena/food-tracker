import { AuthError } from "@/utils/errors"
import { zFoodItemCreateResponse, zFoodItemsFetchByUserIdResponse } from "../types/foodItem.types"
import { zErrorResponse } from "@/common.types"

interface CreateFoodItemProps {
  foodName: string
  caloriesPerServing: number
  servingSizeInGrams: number
  searchVisibility: 'public' | 'private'
  userId: string | undefined
  token: string | undefined
}

interface FindFoodItemsByUserIdProps {
  userId: string | undefined
  token: string | undefined
}

interface DeleteFoodItemProps {
  foodItemId: number,
  userId: string | undefined
  token: string | undefined
}

async function create({
  foodName,
  caloriesPerServing,
  servingSizeInGrams,
  searchVisibility,
  userId,
  token,
}: CreateFoodItemProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const requestBody = JSON.stringify({
    foodName,
    caloriesPerServing,
    servingSizeInGrams,
    searchVisibility,
    userId
  })

  const response = await fetch('/api/foodItems/', {
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
  const foodItemCreateResponse = zFoodItemCreateResponse.parse(responseJson)
  return foodItemCreateResponse.data.newFoodItem
}

async function findFoodItemsByUserId({ userId, token }: FindFoodItemsByUserIdProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/foodItems/user/${userId}`, {
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
  const userFoodItemResponse = zFoodItemsFetchByUserIdResponse.parse(responseJson)
  return userFoodItemResponse.data.userFoodItems
}

async function deleteFoodItem ({ foodItemId, userId, token }: DeleteFoodItemProps) {
  if (userId == null || token == null) {
    Promise.reject()
  }

  const response = await fetch(`/api/foodItems/${foodItemId}`, {
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
  create,
  findFoodItemsByUserId,
  deleteFoodItem
}