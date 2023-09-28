import { useContext, useEffect, useState } from "react"
import { FoodItem, FoodItems } from '../food-items/types/food-item.types'
import { MealEntries } from '../meals/types/meal-entries.types'
import { UserContext } from '../user/user-provider'
import { isSameDay } from "date-fns"
import { useFoodItems } from '../food-items/hooks/food-item.hooks'
import useMealEntries from '../meals/hooks/use-meal-entries'
import useActivities from '../activity/hooks/use-activities'

interface ComputeFoodItemCaloriesProps {
  consumedQuantityInGrams: number | null,
  foodItem: FoodItem | undefined,
}

interface ComputeMealCaloriesProps {
  consumedQuantityInUnits: number | null,
  foodItems: FoodItems | undefined,
  mealEntries: MealEntries | undefined
}

function computeFoodItemCalories({ consumedQuantityInGrams, foodItem }: ComputeFoodItemCaloriesProps) {
  if (!consumedQuantityInGrams || !foodItem) {
    return 0
  }

  return Math.floor((consumedQuantityInGrams / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing)
}

function computeMealCalories({ consumedQuantityInUnits, foodItems, mealEntries }: ComputeMealCaloriesProps) {
  if (!consumedQuantityInUnits || !mealEntries || !foodItems) {
    return 0
  }

  const foodItemIds = mealEntries.map((me) => me.foodItemId)
  const items = foodItems.filter((f) => foodItemIds.includes(f.id))

  let calories: number = 0
  for (let i = 0; i < items.length; ++i) {
    const item = items[i]
    const entry = mealEntries.find((me) => me.foodItemId === item.id)

    if (entry != null) {
      calories += computeFoodItemCalories({ consumedQuantityInGrams: entry.quantity, foodItem: item })
    }
  }

  return calories * consumedQuantityInUnits
}

function CalorieCounter() {
  const { data: foodItems } = useFoodItems()
  const { data: mealEntries } = useMealEntries()
  const { data: activities } = useActivities()

  const user = useContext(UserContext)
  const [calories, setCalories] = useState<number>(0)
  const [calorieGoal, setCalorieGoal] = useState<number>(0)

  useEffect(() => {
    function computeCalories(): number {
      if (activities) {
        const allCalories: number[] = activities
          .filter((a) => isSameDay(a.createdAt, new Date()))
          .map((a) => {
            if (a.foodItemId) {
              return computeFoodItemCalories({
                consumedQuantityInGrams: a.quantityInGrams,
                foodItem: foodItems?.find((f) => f.id === a.foodItemId)
              })
            } else {
              return computeMealCalories({
                consumedQuantityInUnits: a.quantityInUnits,
                foodItems,
                mealEntries: mealEntries?.filter((me) => me.mealId === a.mealId)
              })
            }
          })

        return allCalories.reduce((acc, cur) => acc + cur, 0)
      } else {
        return 0
      }
    }

    setCalories(computeCalories())
  }, [activities, foodItems, mealEntries])

  useEffect(() => {
    if (user?.userProfile?.dailyCalorieGoal) {
      setCalorieGoal(user?.userProfile?.dailyCalorieGoal)
    }
  }, [user?.userProfile?.dailyCalorieGoal])

  return (
    <div className="flex flex-col mx-auto my-10 items-center">
      <div>
        <span className="text-5xl">
          {calorieGoal - calories}
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
