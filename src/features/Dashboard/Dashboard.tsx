import { useContext } from "react"
import { ProfileCard } from "../Profile"
import { UserContext } from "../User/UserProvider"
import { ActivityList } from "../Activity"
import { Activities } from "../Activity/types/activity.types"
import { FoodItems } from "../FoodItems/types/foodItem.types"
import { useFoodItems } from "../FoodItems/hooks/foodItem.hooks"
import { Meals } from "../Meals/types/meals.types"

interface DashboardProps {
  activities: Activities
  foodItems: FoodItems
  meals: Meals
  mealEntries: MealEntries
}

function Dashboard({
  activities,
  foodItems,
  meals,
  mealEntries,
}: DashboardProps) {
  const user = useContext(UserContext)
  return (
    <>
      <ProfileCard profile={user?.userProfile} />
      <ActivityList
        activities={activities}
        meals={meals}
        foodItems={foodItems}
      />
    </>
  )
}

export default Dashboard
