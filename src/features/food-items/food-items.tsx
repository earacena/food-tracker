import { FoodItemList } from './food-item-list';

export function FoodItems(): JSX.Element {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-3xl text-semibold">Food Items</span>
      <FoodItemList />
    </div>
  );
}
