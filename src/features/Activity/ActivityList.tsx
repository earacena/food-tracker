import { Activities } from "./types/activity.types"
import { FoodItems } from "../FoodItems/types/foodItem.types"
import { Meals } from "../Meals/types/meals.types"
import { MealEntries } from "../Meals/types/mealEntries.types"
import { Button } from "@/components/ui/Button"
import { Plus as PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FoodItemActivityListItem from "./FoodItemActivityListItem"
import MealActivityListItem from "./MealActivityFoodItem"

interface ActivityListProps {
  activities: Activities,
  foodItems: FoodItems
  meals: Meals
  mealEntries: MealEntries
}

function ActivityList({ activities, foodItems, meals, mealEntries }: ActivityListProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      {
        activities.length === 0 && (
          <span className="text-sm text-slate-500 my-5">Nothing here, record some activity!</span>
        )
      }
      <Button className="my-1" onClick={() => navigate('/activities/form')}>
        <PlusIcon />
        Add New Activity
      </Button>
      {
        activities && (
          <ul>
            {activities.map((a) => {
              if (a.foodItemId) {
                return (
                  <FoodItemActivityListItem
                    key={a.id}
                    activity={a}
                    foodItems={foodItems}
                  />
                )
              } else {
                return (
                  <MealActivityListItem
                    key={a.id}
                    activity={a}
                    foodItems={foodItems}
                    meals={meals}
                    mealEntries={mealEntries}
                  />
                )
              }
            })}
          </ul>)
      }
    </div>
  )
}

export default ActivityList