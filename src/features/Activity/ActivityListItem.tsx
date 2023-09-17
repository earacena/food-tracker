import { FoodItems } from '../FoodItems/types/foodItem.types'
import { Activity } from './types/activity.types'

interface ActivityListItemProps {
  foodItems: FoodItems,
  meals: Meals,
  activityListItem: Activity
}

function ActivityListItem({ foodItems, meals, activityListItem }: ActivityListItemProps) {

  const foodItem = foodItems.find((f) => f.id === activityListItem.foodItemId)
  const meal = meals.find((m) => m.id === activityListItem.mealId)

  let caloriesConsumed
  if (foodItem) {
    caloriesConsumed = (activityListItem.quantity / foodItem.servingSizeInGrams) * foodItem.caloriesPerServing
  } else {
    caloriesConsumed = activityListItem.quantity * meal.caloriesPerServing
  }

  return (
    <li className="flex flex-row">
      {caloriesConsumed} |
      {" "}
      {`${foodItem?.servingSizeInGrams}g serving of ${foodItem?.foodName}`}
    </li>
  )
}

export default ActivityListItem