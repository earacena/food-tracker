import { MealList } from './meal-list';

export function Meals(): JSX.Element {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-3xl text-semibold">Meals</span>
      <MealList />
    </div>
  );
}
