import { zFoodItemCreateResponse, zFoodItemsFetchByUserIdResponse } from "../types/foodItem.types"

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

  const responseJson = await response.json()
  const userFoodItemResponse = zFoodItemsFetchByUserIdResponse.parse(responseJson)
  return userFoodItemResponse.data.userFoodItems
}

export default {
  create,
  findFoodItemsByUserId
}