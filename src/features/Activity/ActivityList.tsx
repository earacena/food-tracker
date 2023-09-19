import { Activities } from "./types/activity.types"
import ActivityListItem from "./ActivityListItem"
import { FoodItems } from "../FoodItems/types/foodItem.types"
import { Meals } from "../Meals/types/meals.types"
import { MealEntries } from "../Meals/types/mealEntries.types"

interface ActivityListProps {
  activities: Activities,
  foodItems: FoodItems
  meals: Meals
  mealEntries: MealEntries
}

function ActivityList({ activities, foodItems, meals, mealEntries }: ActivityListProps) {
  return (
    <ul>
      {activities.map((a) => (
        <ActivityListItem
          key={a.id}
          activity={a}
          foodItems={foodItems}
          meals={meals}
          mealEntries={mealEntries}
        />
      ))}
    </ul>
  )
}

export default ActivityList