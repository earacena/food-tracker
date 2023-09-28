import { useContext, useEffect, useState } from 'react';
import { isSameDay } from 'date-fns';
import type { FoodItem, FoodItems } from '../food-items/types/food-item.types';
import type { MealEntries } from '../meals/types/meal-entries.types';
import { UserContext } from '../user/user-provider';
import { useFoodItems } from '../food-items';
import { useMealEntries } from '../meals';
import { useActivities } from '../activity';

interface ComputeFoodItemCaloriesProps {
  consumedQuantityInGrams: number | null;
  foodItem: FoodItem | undefined;
}

interface ComputeMealCaloriesProps {
  consumedQuantityInUnits: number | null;
  foodItems: FoodItems | undefined;
  mealEntries: MealEntries | undefined;
}

function computeFoodItemCalories({
  consumedQuantityInGrams,
  foodItem,
}: ComputeFoodItemCaloriesProps): number {
  if (!consumedQuantityInGrams || !foodItem) {
    return 0;
  }

  return Math.floor(
    (consumedQuantityInGrams / foodItem.servingSizeInGrams) *
      foodItem.caloriesPerServing,
  );
}

function computeMealCalories({
  consumedQuantityInUnits,
  foodItems,
  mealEntries,
}: ComputeMealCaloriesProps): number {
  if (!consumedQuantityInUnits || !mealEntries || !foodItems) {
    return 0;
  }

  const foodItemIds = mealEntries.map((me) => me.foodItemId);
  const items = foodItems.filter((f) => foodItemIds.includes(f.id));

  let calories = 0;
  for (const item of items) {
    const entry = mealEntries.find((me) => me.foodItemId === item.id);

    if (entry !== undefined) {
      calories += computeFoodItemCalories({
        consumedQuantityInGrams: entry.quantity,
        foodItem: item,
      });
    }
  }

  return calories * consumedQuantityInUnits;
}

export function CalorieCounter(): JSX.Element {
  const { data: foodItems } = useFoodItems();
  const { data: mealEntries } = useMealEntries();
  const { data: activities } = useActivities();

  const user = useContext(UserContext);
  const [calories, setCalories] = useState<number>(0);
  const [calorieGoal, setCalorieGoal] = useState<number>(0);

  useEffect(() => {
    function computeCalories(): number {
      if (activities) {
        const allCalories: number[] = activities
          .filter((a) => isSameDay(a.createdAt, new Date()))
          .map((a) => {
            if (a.foodItemId) {
              return computeFoodItemCalories({
                consumedQuantityInGrams: a.quantityInGrams,
                foodItem: foodItems?.find((f) => f.id === a.foodItemId),
              });
            }
            return computeMealCalories({
              consumedQuantityInUnits: a.quantityInUnits,
              foodItems,
              mealEntries: mealEntries?.filter((me) => me.mealId === a.mealId),
            });
          });

        return allCalories.reduce((acc, cur) => acc + cur, 0);
      }
      return 0;
    }

    setCalories(computeCalories());
  }, [activities, foodItems, mealEntries]);

  useEffect(() => {
    if (user?.userProfile?.dailyCalorieGoal) {
      setCalorieGoal(user.userProfile.dailyCalorieGoal);
    }
  }, [user?.userProfile?.dailyCalorieGoal]);

  return (
    <div className="flex flex-col mx-auto my-10 items-center">
      <div>
        <span className="text-5xl">{calorieGoal - calories}</span>
        <span className="text-slate-400">
          /{user?.userProfile?.dailyCalorieGoal}
        </span>
      </div>
      calories to go!
    </div>
  );
}
