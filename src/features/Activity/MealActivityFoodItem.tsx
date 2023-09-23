import { useEffect, useState } from "react"
import { Activity } from "./types/activity.types"
import { Meal, Meals } from "../Meals/types/meals.types"
import { MealEntries } from "../Meals/types/mealEntries.types"
import { FoodItems } from "../FoodItems/types/foodItem.types"

interface MealActivityListItemProps {
  activity: Activity
  meals: Meals
  mealEntries: MealEntries
  foodItems: FoodItems
}

function MealActivityListItem({ activity, meals, mealEntries, foodItems }: MealActivityListItemProps) {

  const [calories, setCalories] = useState<number>(0)
  const [meal, setMeal] = useState<Meal | undefined>()

  useEffect(() => {
    function computeMealCalories() {
      const allCalories: number[] = mealEntries
        .filter((me) => me.mealId === activity.mealId)
        .map((me) => {
          const foodItem = foodItems.find((f) => f.id === me.foodItemId)
          if (foodItem) {
            return Math.floor((me.quantity / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing)
          } else {
            return 0
          }
        })

        return allCalories.reduce((acc, cur) => acc + cur, 0)
    }

    const meal = meals.find((m) => m.id === activity.mealId)
    if (meal) {
      setMeal(meal)
    }

    setCalories(computeMealCalories())
  }, [activity.mealId, foodItems, mealEntries, meals])

  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px]">
      <span className="flex flex-col text-xs text-slate-500 pr-2">
        Calories
        <span className="text-lg text-slate-800">
          {Math.floor(calories)}
        </span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 flex-1 px-2">
        Consumed
        <span className="text-lg text-slate-800">
          {meal && (meal?.name?.length > 15 ? meal?.name.slice(0, 15).concat('...') : meal?.name)}
        </span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 pl-2">
        Serving (#)
        <span className="text-lg text-slate-800">
          {activity.quantityInUnits}
        </span>
      </span>
    </li>
  )
}

export default MealActivityListItem
