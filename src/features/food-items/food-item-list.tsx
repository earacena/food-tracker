import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FoodListItem } from './food-list-item';
import { useFoodItems } from './hooks/food-item.hooks';

export function FoodItemList(): JSX.Element {
  const navigate = useNavigate();
  const { data: foodItems } = useFoodItems();

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
        <ul>
          {foodItems.map((f) => (
            <FoodListItem foodItem={f} key={f.id} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
