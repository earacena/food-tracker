import { FoodItem } from "../FoodItems/types/foodItem.types"
import { MealEntry } from "./types/mealEntries.types"

interface MealEntriesListProps {
  mealEntry: MealEntry
  foodItem: FoodItem | undefined
}

function MealEntriesListItem({ mealEntry, foodItem }: MealEntriesListProps) {
  if (!foodItem) {
    return
  }

  return (
    <li className="flex flex-row border border-slate-400 p-2 rounded-md my-1">
      <span className="flex flex-1 flex-col text-xs text-slate-500 pr-2 border-r-2 ">
        Food Item
        <span className="text-lg text-slate-800">
          {foodItem?.foodName.length > 15 ? foodItem.foodName.slice(0, 16).concat('...') : foodItem.foodName}
        </span>
      </span>

      <span className="flex flex-col text-xs text-slate-500 pl-2">
        Serving (g)
        <span className="text-lg text-slate-800">
          {mealEntry.quantity}
        </span>
      </span>
    </li>
  )
}

export default MealEntriesListItem