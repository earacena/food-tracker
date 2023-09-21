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
      const meal = meals.find((m) => m.id === activity.mealId)
      if (meal) {
        setMeal(meal)
        const entries = mealEntries.filter((me) => me.mealId === meal?.id)
        for (let idx = 0; idx < entries.length; ++idx) {
          const entry = entries.at(idx)
          if (entry) {
            const foodItem = foodItems.find((f) => f.id === entry.foodItemId)
            if (foodItem) {
              setCalories((prevCalories) => prevCalories + ((entry.quantity * foodItem?.servingSizeInGrams) / foodItem?.caloriesPerServing))
            }
          }
        }
      }
    }

    computeMealCalories()
  }, [])

  return (
    <li>
      {calories} * {meal?.name} (x{activity.quantityInUnits})
    </li>
  )
}

export default MealActivityListItem
