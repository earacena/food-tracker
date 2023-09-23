import { Button } from "@/components/ui/Button"
import { FoodItems } from "../FoodItems/types/foodItem.types"
import MealEntriesListItem from "./MealEntriesListItem"
import { MealEntries } from "./types/mealEntries.types"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface MealEntriesListProps {
  mealId: number
  mealEntries: MealEntries
  foodItems: FoodItems
}

function MealEntriesList({ mealId, mealEntries, foodItems }: MealEntriesListProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-end">
      {
        mealEntries.length === 0 && (
          <span className="text-sm text-slate-500 my-5">
            There are no entries for this meal.
          </span>
        )
      }
      <ul className="m-1">
        {mealEntries.map((me) => (
          <MealEntriesListItem
            key={me.id}
            mealEntry={me}
            foodItem={foodItems?.find((f) => f.id === me.foodItemId)}
          />
        ))}
      </ul>
      <Button size="sm" onClick={() => navigate(`/mealEntries/form/${mealId}`)}>
        <PlusIcon />
        Add New Entry
      </Button>
    </div>
  )
}

export default MealEntriesList