import { FoodItemDropdownMenu } from './food-item-dropdown-menu';
import type { FoodItem } from './types/food-item.types';

interface FoodListItem {
  foodItem: FoodItem;
  dropdown: boolean;
}

export function FoodListItem({
  foodItem,
  dropdown,
}: FoodListItem): JSX.Element {
  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px] shadow-md">
      <span className="flex flex-col text-xs text-slate-500 pr-2 flex-1">
        Name
        <span className="text-lg text-slate-800">
          {foodItem.foodName.length > 10
            ? foodItem.foodName.slice(0, 9).concat('...')
            : foodItem.foodName}
        </span>
      </span>

      <span className="flex flex-col text-xs text-slate-500 border-l-2 border-slate-400 items-center px-2">
        Calories (S)
        <span className="text-lg text-slate-800">
          {foodItem.caloriesPerServing}
        </span>
      </span>

      <span className="flex flex-col text-xs text-slate-500 border-l-2 border-slate-400 items-center pl-2">
        Serving (g)
        <span className="text-lg text-slate-800">
          {foodItem.servingSizeInGrams ? foodItem.servingSizeInGrams : '-'}
        </span>
      </span>

      <span className="flex flex-col text-xs text-slate-500 border-l-2 border-slate-400 items-center pl-2">
        Serving (unit)
        <span className="text-lg text-slate-800">
          {foodItem.servingSizeInUnits ? foodItem.servingSizeInUnits : '-'}
        </span>
      </span>

      {dropdown ? <FoodItemDropdownMenu foodItem={foodItem} /> : null}
    </li>
  );
}
