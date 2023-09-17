import { Activities } from "./types/activity.types"
import ActivityListItem from "./ActivityListItem"
import { FoodItems } from "../FoodItems/types/foodItem.types"

interface ActivityListProps {
  activities: Activities,
  foodItems: FoodItems
  meals: Meals
}

function ActivityList({ activities, foodItems, meals }: ActivityListProps) {
  return (
    <ul>
      {activities.map((a) => (
        <ActivityListItem
          activityListItem={a}
          foodItems={foodItems}
          meals={meals}
        />
      ))}
    </ul>
  )
}

export default ActivityList