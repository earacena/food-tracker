import { useContext, useEffect, useState } from "react"
import { Activities } from "../Activity/types/activity.types"
import { FoodItem, FoodItems } from "../FoodItems/types/foodItem.types"
import { MealEntries } from "../Meals/types/mealEntries.types"
import { UserContext } from "../User/UserProvider"
import { isSameDay } from "date-fns"

interface CalorieCounterProps {
  activities: Activities
  mealEntries: MealEntries
  foodItems: FoodItems
}

interface ComputeFoodItemCaloriesProps {
  consumedQuantityInGrams: number | null,
  foodItem: FoodItem | undefined,
}

interface ComputeMealCaloriesProps {
  consumedQuantityInUnits: number | null,
  foodItems: FoodItems,
  mealEntries: MealEntries
}

function computeFoodItemCalories({ consumedQuantityInGrams, foodItem }: ComputeFoodItemCaloriesProps) {
  if (!consumedQuantityInGrams || !foodItem) {
    return 0
  }

  return Math.floor((consumedQuantityInGrams / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing)
}

function computeMealCalories ({ consumedQuantityInUnits, foodItems, mealEntries }: ComputeMealCaloriesProps) {
  if (!consumedQuantityInUnits || !mealEntries) {
    return 0
  }

  const foodItemIds = mealEntries.map((me) => me.foodItemId)
  const items = foodItems.filter((f) => foodItemIds.includes(f.id))

  let calories: number = 0
  for (let i = 0; i < foodItemIds.length; ++i) {
    const id = foodItemIds[i]
    const item = items.find((i) => i.id === id)
    const entry = mealEntries.find((me) => me.foodItemId === id)

    if (entry && item) {
      calories += Math.floor((entry.quantity / item?.servingSizeInGrams) / item?.caloriesPerServing)
    }
  }

  return calories * consumedQuantityInUnits
}

function CalorieCounter({ activities, mealEntries, foodItems }: CalorieCounterProps) {
  const user = useContext(UserContext)
  const [calories, setCalories] = useState<number>()

  useEffect(() => {
    function computeCalories (): number {
      const allCalories: number[] = activities
        .filter((a) => isSameDay(a.createdAt, new Date()))
        .map((a) => {
        if (a.foodItemId) {
          return computeFoodItemCalories({
            consumedQuantityInGrams: a.quantityInGrams,
            foodItem: foodItems.find((f) => f.id === a.foodItemId)
          })
        } else {
          return computeMealCalories({
            consumedQuantityInUnits: a.quantityInUnits,
            foodItems,
            mealEntries: mealEntries.filter((me) => me.mealId === a.mealId)
          })
        }
      })

      return allCalories.reduce((acc, cur) => acc + cur, 0)
    }

    setCalories(computeCalories())
  }, [activities, foodItems, mealEntries])

  return (
    <div className="flex flex-col mx-auto my-10 items-center">
      <div>
        <span className="text-5xl">
          {user && user.userProfile && user.userProfile.dailyCalorieGoal && calories && (user?.userProfile?.dailyCalorieGoal - calories)}
        </span>
        <span className="text-slate-400">
          /{user?.userProfile?.dailyCalorieGoal}
        </span>
      </div>
      calories to go!
    </div>
  )
}

export default CalorieCounter
