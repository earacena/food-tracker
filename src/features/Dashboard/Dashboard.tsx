import { FoodItems as FoodItemsType } from "../FoodItems/types/foodItem.types"
import { Meals } from "../Meals"
import { MealEntries } from "../Meals/types/mealEntries.types"
import Activities from "../Activity/Activities"
import { Activities as ActivitiesType } from "../Activity/types/activity.types"
import FoodItems from "../FoodItems/FoodItems"
import CalorieCounter from "./CalorieCounter"

interface DashboardProps {
  activities: ActivitiesType
  foodItems: FoodItemsType
  meals: Meals
  mealEntries: MealEntries
}

function Dashboard({
  activities,
  foodItems,
  meals,
  mealEntries
}: DashboardProps) {
  return (
    <>
      <CalorieCounter 
        activities={activities}
        mealEntries={mealEntries}
        foodItems={foodItems}
      />
      <Activities
        activities={activities}
        meals={meals}
        mealEntries={mealEntries}
        foodItems={foodItems}
      />
      <Meals meals={meals} mealEntries={mealEntries} />
      <FoodItems
        foodItems={foodItems}
      />
    </>
  )
}

export default Dashboard
