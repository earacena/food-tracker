import MealEntriesList from "./MealEntriesList"
import { type Meal } from "./types/meals.types"

interface MealListItemProps {
  meal: Meal
}

function MealListItem ({ meal }: MealListItemProps) {
  return (
    <li className="flex flex-col border border-slate-500 rounded-md p-3 my-2">
      {meal.name}
      <span className="border-t-2 border-slate-400">
        <MealEntriesList
          mealId={meal.id}
        />
      </span>
    </li>
  )
}

export default MealListItem