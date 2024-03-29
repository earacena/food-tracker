import type { FoodItem } from '../food-items/types/food-item.types';
import { MealEntryDropdownMenu } from './meal-entry-dropdown-menu';
import type { MealEntry } from './types/meal-entries.types';

interface MealEntriesListProps {
  mealEntry: MealEntry;
  foodItem: FoodItem | undefined;
}

export function MealEntriesListItem({
  mealEntry,
  foodItem,
}: MealEntriesListProps): JSX.Element | null {
  if (!foodItem) {
    return null;
  }

  return (
    <li className="flex flex-row border border-slate-400 p-2 rounded-md my-1">
      <span className="flex flex-1 flex-col text-xs text-slate-500 pr-2 border-r-2 items-center mr-auto">
        Food Item
        <span className="text-lg text-slate-800">
          {foodItem.foodName.length > 15
            ? foodItem.foodName.slice(0, 16).concat('...')
            : foodItem.foodName}
        </span>
      </span>

      {mealEntry.quantityInGrams ? (
        <span className="flex flex-col text-xs text-slate-500 pl-2 items-center">
          Serving (g)
          <span className="text-lg text-slate-800">
            {mealEntry.quantityInGrams}
          </span>
        </span>
      ) : null}

      {mealEntry.quantityInUnits ? (
        <span className="flex flex-col text-xs text-slate-500 pl-2 items-center">
          Serving (#)
          <span className="text-lg text-slate-800">
            {mealEntry.quantityInUnits}
          </span>
        </span>
      ) : null}

      <MealEntryDropdownMenu foodItem={foodItem} mealEntry={mealEntry} />
    </li>
  );
}
