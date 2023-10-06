import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { FoodItem } from './types/food-item.types';

interface FoodItemDialogProps {
  foodItem: FoodItem;
  children: React.ReactNode;
}

export function FoodItemDialog({
  foodItem,
  children,
}: FoodItemDialogProps): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-slate-200 hover:shadow-lg rounded-md">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mx-auto text-3xl">
          {foodItem.foodName}
        </DialogTitle>
        <DialogDescription className="flex flex-row items-center justify-between">
          <span className="flex flex-col items-center">
            <span className="text-xs">Serving Size (g)</span>
            <span className="text-2xl">
              {foodItem.servingSizeInGrams ? foodItem.servingSizeInGrams : '-'}
            </span>
          </span>

          <span className="flex flex-col items-center">
            <span className="text-xs">Serving Size (units)</span>
            <span className="text-2xl">
              {foodItem.servingSizeInUnits ? foodItem.servingSizeInUnits : '-'}
            </span>

            <span className="flex flex-col items-center">
              <span className="text-xs">Calories Per Serving (kcal)</span>
              <span className="text-2xl">{foodItem.caloriesPerServing}</span>
            </span>
          </span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
