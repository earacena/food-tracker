import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MealListItem } from './meal-list-item';
import { useMeals } from './hooks/use-meals';
import { Skeleton } from '@/components/ui/skeleton';

export function MealList(): JSX.Element {
  const navigate = useNavigate();
  const { data: meals, isLoading } = useMeals();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Button className="my-3" disabled>
          <PlusIcon />
          Add New Meal
        </Button>
        <Skeleton className="w-80 h-48 m-2" />
        <Skeleton className="w-80 h-48 m-2" />
        <Skeleton className="w-80 h-48 m-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-80">
      {meals?.length === 0 && (
        <span className="text-sm text-slate-500 my-5">
          Nothing here, add some meals!
        </span>
      )}

      <Button
        className="my-3"
        onClick={() => {
          navigate('/meals/form');
        }}
      >
        <PlusIcon />
        Add New Meal
      </Button>

      {meals ? (
        <ul className="flex flex-col w-full">
          {meals.map((m) => (
            <MealListItem key={m.id} meal={m} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
