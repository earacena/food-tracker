import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FoodListItem } from './food-list-item';
import { useFoodItems } from './hooks/food-item.hooks';
import { FoodItemDialog } from './food-item-dialog';

export function FoodItemList(): JSX.Element {
  const navigate = useNavigate();
  const { data: foodItems, isLoading } = useFoodItems();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className=" w-[360px] h-16 rounded-lg m-2" />
        <Skeleton className=" w-[360px] h-16 rounded-lg m-2" />
        <Skeleton className=" w-[360px] h-16 rounded-lg m-2" />
        <Skeleton className=" w-[360px] h-16 rounded-lg m-2" />
        <Skeleton className=" w-[360px] h-16 rounded-lg m-2" />
        <Button className="my-2" disabled>
          <PlusIcon />
          Add Food Item
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {foodItems?.length === 0 && (
        <span className="text-sm text-slate-500 my-5">
          Nothing here, add some items!
        </span>
      )}
      <Button
        className="my-2"
        onClick={() => {
          navigate('/foodItems/form');
        }}
      >
        <PlusIcon />
        Add Food Item
      </Button>

      {foodItems ? (
        <ul className="flex flex-col">
          {foodItems.map((f) => (
            <FoodItemDialog foodItem={f} key={f.id}>
              <FoodListItem dropdown={false} foodItem={f} key={f.id} />
            </FoodItemDialog>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
