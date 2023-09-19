import { FoodItems } from "../FoodItems/types/foodItem.types"
import { MealEntries } from "../Meals/types/mealEntries.types"
import { Meals } from "../Meals/types/meals.types"
import ActivityList from "./ActivityList"
import { Activities } from "./types/activity.types"

interface ActivitiesProps {
  activities: Activities
  meals: Meals
  mealEntries: MealEntries
  foodItems: FoodItems
}

function Activities ({ meals, mealEntries, foodItems, activities }: ActivitiesProps) {
  return (
    <>
      Activities
      <ActivityList
        meals={meals}
        mealEntries={mealEntries}
        foodItems={foodItems}
        activities={activities}
      />
    </>
  )
}

export default Activities