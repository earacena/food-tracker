import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFoodItems } from '../food-items/hooks/food-item.hooks';
import { MealEntriesListItem } from './meal-entries-list-item';
import { useMealEntries } from './hooks/use-meal-entries';

interface MealEntriesListProps {
  mealId: number;
}

export function MealEntriesList({ mealId }: MealEntriesListProps): JSX.Element {
  const navigate = useNavigate();
  const { data: foodItems } = useFoodItems();
  const { data: allMealEntries } = useMealEntries();

  const mealEntries = allMealEntries?.filter((me) => me.mealId === mealId);

  return (
    <div className="flex flex-col items-end">
      {mealEntries?.length === 0 && (
        <span className="text-sm text-slate-500 my-5">
          There are no entries for this meal.
        </span>
      )}

      <ul className="m-1">
        {mealEntries?.map((me) => (
          <MealEntriesListItem
            foodItem={foodItems?.find((f) => f.id === me.foodItemId)}
            key={me.id}
            mealEntry={me}
          />
        ))}
      </ul>

      <Button
        onClick={() => {
          navigate(`/mealEntries/form/${mealId}`);
        }}
        size="sm"
      >
        <PlusIcon />
        Add New Entry
      </Button>
    </div>
  );
}
