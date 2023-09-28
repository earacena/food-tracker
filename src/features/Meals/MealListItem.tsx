import MealDropdownMenu from "./MealDropdownMenu"
import MealEntriesList from "./MealEntriesList"
import { type Meal } from "./types/meals.types"

interface MealListItemProps {
  meal: Meal
}

function MealListItem ({ meal }: MealListItemProps) {
  return (
    <li className="flex flex-col border border-slate-500 rounded-md p-3 w-full">
      <div className="flex flex-row items-center">
        <div className="flex flex-col mr-auto">
          <span className="text-xs text-slate-500">
            Meal Name
          </span>
          <span className="text-xl">
          {meal.name}
          </span>
        </div>

        <MealDropdownMenu meal={meal} />
      </div>
      <span className="border-t-2 border-slate-400">
        <MealEntriesList
          mealId={meal.id}
        />
      </span>
    </li>
  )
}

export default MealListItem