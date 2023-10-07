import { MealDropdownMenu } from './meal-dropdown-menu';
import { MealEntriesList } from './meal-entries-list';
import { type Meal } from './types/meals.types';

interface MealListItemProps {
  meal: Meal;
}

export function MealListItem({ meal }: MealListItemProps): JSX.Element {
  return (
    <li className="flex flex-col border border-slate-500 rounded-md p-3 w-full m-1">
      <div className="flex flex-row items-center">
        <div className="flex flex-col mr-auto">
          <span className="text-xs text-slate-500">Meal Name</span>
          <span className="text-xl">{meal.name}</span>
        </div>

        <MealDropdownMenu meal={meal} />
      </div>
      <span className="border-t-2 border-slate-400">
        <MealEntriesList mealId={meal.id} />
      </span>
    </li>
  );
}
