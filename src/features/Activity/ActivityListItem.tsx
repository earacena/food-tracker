import logger from '@/utils/Logger'
import { FoodItems } from '../FoodItems/types/foodItem.types'
import { MealEntries } from '../Meals/types/mealEntries.types'
import { Meals } from '../Meals/types/meals.types'
import { Activity } from './types/activity.types'

interface ActivityListItemProps {
  foodItems: FoodItems,
  meals: Meals,
  activity: Activity
  mealEntries: MealEntries
}

function ActivityListItem({ foodItems, meals, mealEntries, activity }: ActivityListItemProps) {

  const foodItem = foodItems.find((f) => f.id === activity.foodItemId)
  const meal = meals.find((m) => m.id === activity.mealId)
  const entries = mealEntries.filter((me) => me.mealId === meal?.id)

  const mealCalories = entries.reduce((acc, cur) => {
    const item = foodItems.find((f) => f.id === cur.id)
    let totalItemCalories = 0
    if (item) {
      const servings = cur.quantity / item?.servingSizeInGrams
      totalItemCalories = item?.caloriesPerServing * servings
    } else {
      logger.log(`unable to find meal entry item: ${cur}`)
    }

    return acc + totalItemCalories
  }, 0)

  let foodItemCalories
  if (foodItem) {
    foodItemCalories = (activity.quantity / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing
  }

  return (
    <li className="flex flex-row">
      {foodItem ? foodItemCalories : mealCalories} |
      {" "}
      {foodItem 
        ? `${foodItem?.servingSizeInGrams}g serving of ${foodItem?.foodName}`
        : `${meal?.name}`}
    </li>
  )
}

export default ActivityListItem