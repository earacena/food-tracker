import { Button } from '@/components/ui/button'
import MealEntriesListItem from './meal-entries-list-item'
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useFoodItems } from '../food-items/hooks/food-item.hooks'
import useMealEntries from './hooks/use-meal-entries'

interface MealEntriesListProps {
  mealId: number
}

function MealEntriesList({ mealId }: MealEntriesListProps) {
  const navigate = useNavigate()
  const { data: foodItems } = useFoodItems()
  const { data: allMealEntries } = useMealEntries()

  const mealEntries = allMealEntries?.filter((me) => me.mealId === mealId)

  return (
    <div className="flex flex-col items-end">
      {
        mealEntries?.length === 0 && (
          <span className="text-sm text-slate-500 my-5">
            There are no entries for this meal.
          </span>
        )
      }

      <ul className="m-1">
        {
          mealEntries?.map((me) => (
            <MealEntriesListItem
              key={me.id}
              mealEntry={me}
              foodItem={foodItems?.find((f) => f.id === me.foodItemId)}
            />
          ))
        }
      </ul>

      <Button size="sm" onClick={() => navigate(`/mealEntries/form/${mealId}`)}>
        <PlusIcon />
        Add New Entry
      </Button>
    </div>
  )
}

export default MealEntriesList