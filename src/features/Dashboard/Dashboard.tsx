import { useContext } from "react"
import { ProfileCard } from "../Profile"
import { UserContext } from "../User/UserProvider"
import { FoodItems as FoodItemsType } from "../FoodItems/types/foodItem.types"
import { Meals } from "../Meals"
import { MealEntries } from "../Meals/types/mealEntries.types"
import Activities from "../Activity/Activities"
import { Activities as ActivitiesType } from "../Activity/types/activity.types"
import FoodItems from "../FoodItems/FoodItems"

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
  const user = useContext(UserContext)
  return (
    <>
      <ProfileCard profile={user?.userProfile} />
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
