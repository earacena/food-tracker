import { useEffect, useState } from "react"
import { FoodItem, FoodItems } from "../FoodItems/types/foodItem.types"
import { Activity } from "./types/activity.types"

interface FoodItemActivityListItemProps {
  activity: Activity
  foodItems: FoodItems
}

function FoodItemActivityListItem({ activity, foodItems }: FoodItemActivityListItemProps) {

  const [calories, setCalories] = useState<number>(0)
  const [foodItem, setFoodItem] = useState<FoodItem | undefined>()

  useEffect(() => {
    function computeFoodItemCalories() {
      const foodItem = foodItems.find((f) => f.id === activity.foodItemId)
      if (foodItem && activity.quantityInGrams && foodItem?.servingSizeInGrams) {
        const calories = Math.floor((activity.quantityInGrams / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing)
        setFoodItem(foodItem)
        setCalories(calories)
      }
    }

    computeFoodItemCalories()
  }, [])

  return (
    <li>
      {calories} * {foodItem?.foodName} ({activity.quantityInGrams}g)
    </li>
  )
}

export default FoodItemActivityListItem