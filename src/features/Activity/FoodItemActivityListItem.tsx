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
  }, [activity.foodItemId, activity.quantityInGrams, foodItems])

  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px]">
      <span className="flex flex-col text-xs text-slate-500 pr-2">
        Calories
        <span className="text-lg text-slate-800">
          {calories}
        </span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 flex-1 px-2">
        Consumed
        <span className="text-lg text-slate-800">
          {foodItem && (foodItem?.foodName?.length > 15 ? foodItem?.foodName.slice(0, 16).concat('...') : foodItem?.foodName)}
        </span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 pl-2">
        Serving (g)
        <span className="text-lg text-slate-800">
          {activity.quantityInGrams}
        </span>
      </span>
    </li>
  )
}

export default FoodItemActivityListItem