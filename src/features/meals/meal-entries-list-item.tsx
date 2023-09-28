import { FoodItem } from '../food-items/types/food-item.types'
import MealEntryDropdownMenu from './meal-entry-dropdown-menu'
import { MealEntry } from './types/meal-entries.types'

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

      <MealEntryDropdownMenu
        mealEntry={mealEntry}
        foodItem={foodItem}
      />
    </li>
  )
}

export default MealEntriesListItem