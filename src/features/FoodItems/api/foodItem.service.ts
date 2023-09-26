import { AuthError } from "@/utils/errors"
import { zFoodItemCreateResponse, zFoodItemsFetchByUserIdResponse } from "../types/foodItem.types"
import { AuthenticationProps, zErrorResponse } from "@/common.types"

interface CreateFoodItemProps extends AuthenticationProps {
  foodName: string
  caloriesPerServing: number
  servingSizeInGrams: number
  searchVisibility: 'public' | 'private'
}

interface FindFoodItemsByUserIdProps extends AuthenticationProps {}

interface DeleteFoodItemProps extends AuthenticationProps {
  foodItemId: number
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