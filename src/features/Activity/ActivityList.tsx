import { Activity } from "./types/activity.types"
import { Button } from "@/components/ui/Button"
import { Plus as PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FoodItemActivityListItem from "./FoodItemActivityListItem"
import MealActivityListItem from "./MealActivityFoodItem"
import { isSameDay } from "date-fns"
import { useFoodItems } from "../FoodItems/hooks/foodItem.hooks"
import useMeals from "../Meals/hooks/useMeals"
import useMealEntries from "../Meals/hooks/useMealEntries"
import useActivities from "./hooks/useActivities"

interface ActivityListProps {
  onlyCurrentDay: boolean
  noPastActivity: boolean
}

function ActivityList({ onlyCurrentDay, noPastActivity }: ActivityListProps) {

  const navigate = useNavigate()
  const { data: foodItems } = useFoodItems()
  const { data: meals } = useMeals()
  const { data: mealEntries } = useMealEntries()
  const { data: activities } = useActivities()

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
        !onlyCurrentDay && activities?.length === 0 && (
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
                        foodItem={foodItems?.find((f) => a.foodItemId === f.id)}
                      />
                    )
                  } else {
                    return (
                      <MealActivityListItem
                        key={a.id}
                        activity={a}
                        foodItems={foodItems}
                        meal={meals?.find((m) => m.id === a.mealId)}
                        mealEntries={mealEntries?.filter((me) => me.mealId === a.mealId)}
                      />
                    )
                  }
                })
            }
          </ul>)
      }
      {
        !noPastActivity && onlyCurrentDay && (
          <span className="my-3">
            Past Activities
          </span>
        )
      }
      {
        !noPastActivity && (
          <ul>
            {
              onlyCurrentDay && activities?.filter((a) => notSameDayFilter(a))
                .map((a) => {
                  if (a.foodItemId) {
                    return (
                      <FoodItemActivityListItem
                        key={a.id}
                        activity={a}
                        foodItem={foodItems?.find((f) => f.id === a.foodItemId)}
                      />
                    )
                  } else {
                    return (
                      <MealActivityListItem
                        key={a.id}
                        activity={a}
                        foodItems={foodItems}
                        meal={meals?.find((m) => m.id === a.mealId)}
                        mealEntries={mealEntries?.filter((me) => me.mealId === a.mealId)}
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