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
        <DialogDescription className="flex flex-col items-start justify-between">
          <span className="flex flex-col my-3">
            Serving Size
            <span className="flex flex-row text-3xl items-center">
              {foodItem.servingSizeInGrams ? foodItem.servingSizeInGrams : '-'}
              <span className="ml-auto text-xs">grams</span>
            </span>
            <span className="flex flex-row text-3xl items-center">
              {foodItem.servingSizeInUnits ? foodItem.servingSizeInUnits : '-'}
              <span className="ml-auto text-xs">units</span>
            </span>
          </span>
          <span className="flex flex-col items-start">
            Calories Per Serving (kcal)
            <span className="flex flex-row items-center text-3xl">
              {foodItem.caloriesPerServing}
              <span className="ml-5 text-xs">calories</span>
            </span>
          </span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
