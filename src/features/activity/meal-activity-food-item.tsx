import { useEffect, useState } from 'react';
import { type Meal } from '../meals/types/meals.types';
import type { MealEntries } from '../meals/types/meal-entries.types';
import type { FoodItems } from '../food-items/types/food-item.types';
import type { Activity } from './types/activity.types';

interface MealActivityListItemProps {
  activity: Activity;
  meal: Meal | undefined;
  mealEntries: MealEntries | undefined;
  foodItems: FoodItems | undefined;
}

export function MealActivityListItem({
  activity,
  meal,
  mealEntries,
  foodItems,
}: MealActivityListItemProps): JSX.Element | null {
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    function computeMealCalories(): number {
      if (mealEntries) {
        const allCalories: number[] = mealEntries.map((me) => {
          const foodItem = foodItems?.find((f) => f.id === me.foodItemId);
          if (foodItem?.servingSizeInGrams && me.quantityInGrams) {
            return Math.floor(
              (me.quantityInGrams / foodItem.servingSizeInGrams) *
                foodItem.caloriesPerServing,
            );
          } else if (foodItem?.servingSizeInUnits && me.quantityInUnits) {
            return Math.floor(
              (me.quantityInUnits / foodItem.servingSizeInUnits) *
                foodItem.caloriesPerServing,
            );
          }

          return 0;
        });

        return allCalories.reduce((acc, cur) => acc + cur, 0);
      }
      return 0;
    }

    setCalories(computeMealCalories());
  }, [activity.mealId, foodItems, mealEntries]);

  if (!meal) {
    return null;
  }

  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px]">
      <span className="flex flex-col text-xs text-slate-500 pr-2">
        Calories
        <span className="text-lg text-slate-800">{Math.floor(calories)}</span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 flex-1 px-2">
        Consumed
        <span className="text-lg text-slate-800">
          {meal.name.length > 15
            ? meal.name.slice(0, 15).concat('...')
            : meal.name}
        </span>
      </span>

      <span className="flex flex-col text-xs border-l-2 border-slate-400 text-slate-500 pr-2 pl-2">
        Serving (#)
        <span className="text-lg text-slate-800">
          {activity.quantityInUnits}
        </span>
      </span>
    </li>
  );
}
