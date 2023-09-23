import { Activities, Activity } from "./types/activity.types"
import { FoodItems } from "../FoodItems/types/foodItem.types"
import { Meals } from "../Meals/types/meals.types"
import { MealEntries } from "../Meals/types/mealEntries.types"
import { Button } from "@/components/ui/Button"
import { Plus as PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FoodItemActivityListItem from "./FoodItemActivityListItem"
import MealActivityListItem from "./MealActivityFoodItem"
import { isSameDay } from "date-fns"

interface ActivityListProps {
  activities: Activities,
  foodItems: FoodItems
  meals: Meals
  mealEntries: MealEntries
  onlyCurrentDay: boolean
  noPastActivity: boolean
}

function ActivityList({ activities, foodItems, meals, mealEntries, onlyCurrentDay, noPastActivity }: ActivityListProps) {
  const navigate = useNavigate()

  function sameDayFilter(a: Activity): boolean {
    return isSameDay(a.createdAt, new Date())
  }

  function notSameDayFilter(a: Activity): boolean {
    return !sameDayFilter(a)
  }

  function allActivitiesFilter(): boolean {
    return true
  }

  return (
    <div className="flex flex-col items-center">
      {
        !onlyCurrentDay && activities.length === 0 && (
          <span className="text-sm text-slate-500 my-5">Nothing here, record some activity!</span>
        )
      }
      <Button className="my-1" onClick={() => navigate('/activities/form')}>
        <PlusIcon />
        Add New Activity
      </Button>
      {
        !noPastActivity && onlyCurrentDay && (
          <span className="my-3">
            Today's Activities
          </span>
        )
      }
      {
        activities && (
          <ul>
            {
              activities.filter((a) => onlyCurrentDay ? sameDayFilter(a) : allActivitiesFilter()).length === 0 && (
                <span className="text-sm text-slate-500 my-5">Nothing here, record some activity!</span>
              )
            }
            {
              activities
                .filter((a) => onlyCurrentDay ? sameDayFilter(a) : allActivitiesFilter())
                .map((a) => {
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
                })
            }
          </ul>)
      }
      {
        !noPastActivity && onlyCurrentDay && (
          <span>
            Past Activities
          </span>
        )
      }
      {
        !noPastActivity && (
          <ul>
            {
              onlyCurrentDay && activities
                .filter((a) => notSameDayFilter(a))
                .map((a) => {
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
                })
            }
          </ul>
        )
      }
    </div>
  )
}

export default ActivityList