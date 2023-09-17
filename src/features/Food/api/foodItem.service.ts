import { zErrorResponse } from "@/common.types"
import { zFoodItemCreateResponse } from "../types/foodItem.types"

interface CreateFoodItemProps {
  foodName: string
  caloriesPerServing: number
  servingSizeInGrams: number | undefined
  servingSizeInUnits: number | undefined
  userId: string | undefined
  token: string | undefined
}

async function create({
  foodName,
  caloriesPerServing,
  servingSizeInGrams,
  servingSizeInUnits,
  userId,
  token,
}: CreateFoodItemProps) {
  const requestBody = JSON.stringify({
    foodName,
    caloriesPerServing,
    servingSizeInGrams: servingSizeInGrams ?? null,
    servingSizeInUnits: servingSizeInUnits ?? null,
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

  if (!responseJson.success) {
    const errorResponse = zErrorResponse.parse(responseJson)
    throw new Error(errorResponse.errorMessage)
  } else {
    const foodItemCreateResponse = zFoodItemCreateResponse.parse(responseJson)
    return foodItemCreateResponse.data.newFoodItem
  }
}

export default {
  create,
}