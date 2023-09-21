import MealEntriesList from "./MealEntriesList"
import { type FoodItems } from "../FoodItems/types/foodItem.types"
import { type MealEntries } from "./types/mealEntries.types"
import { type Meal } from "./types/meals.types"

interface MealListItemProps {
  meal: Meal
  mealEntries: MealEntries
  foodItems: FoodItems
}

function MealListItem ({ meal, mealEntries, foodItems }: MealListItemProps) {
  return (
    <li className="flex flex-col border border-slate-500 rounded-md p-3 my-2">
      {meal.name}
      <span className="border-t-2 border-slate-400">
        <MealEntriesList
          mealId={meal.id}
          mealEntries={mealEntries.filter((me) => me.mealId === meal.id)}
          foodItems={foodItems}
        />
      </span>
    </li>
  )
}

export default MealListItem