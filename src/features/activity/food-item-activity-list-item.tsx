import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import type { FoodItem } from '../food-items/types/food-item.types';
import type { Activity } from './types/activity.types';
import { ActivityDropdownMenu } from './activity-dropdown-menu';

interface FoodItemActivityListItemProps {
  activity: Activity;
  foodItem: FoodItem | undefined;
}

export function FoodItemActivityListItem({
  activity,
  foodItem,
}: FoodItemActivityListItemProps): JSX.Element | null {
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    function computeFoodItemCalories(): void {
      if (foodItem && activity.quantityInGrams && foodItem.servingSizeInGrams) {
        // Compute using quantityInGrams
        const itemCalories = Math.floor(
          (activity.quantityInGrams / foodItem.servingSizeInGrams) *
            foodItem.caloriesPerServing,
        );
        setCalories(itemCalories);
      } else if (
        foodItem &&
        activity.quantityInUnits &&
        foodItem.servingSizeInUnits
      ) {
        // Compute using quantityInUnits
        const itemCalories = Math.floor(
          activity.quantityInUnits * foodItem.caloriesPerServing,
        );
        setCalories(itemCalories);
      }
    }

    computeFoodItemCalories();
  }, [
    activity.foodItemId,
    activity.quantityInGrams,
    activity.quantityInUnits,
    foodItem,
  ]);

  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px]">
      <span className="flex flex-col text-xs text-slate-500 pr-2">
        Calories
        <span className="text-lg text-slate-800">{calories}</span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 flex-1 px-2">
        Consumed
        <span className="text-lg text-slate-800">
          {foodItem?.foodName
            .slice(0, 16)
            .concat(foodItem.foodName.length > 16 ? '...' : '')}
          {!foodItem && (
            <div className="flex flex-row items-center text-red-500">
              {' '}
              Deleted item <Trash size={20} />
            </div>
          )}
        </span>
      </span>

      {activity.quantityInGrams ? (
        <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 pl-2">
          Serving (g)
          <span className="text-lg text-slate-800">
            {activity.quantityInGrams}
          </span>
        </span>
      ) : null}

      {activity.quantityInUnits ? (
        <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 pl-2">
          Serving (#)
          <span className="text-lg text-slate-800">
            {activity.quantityInUnits}
          </span>
        </span>
      ) : null}

      <ActivityDropdownMenu activity={activity} />
    </li>
  );
}
