import { FoodItems } from "../FoodItems/types/foodItem.types"
import MealList from "./MealList"
import { MealEntries } from "./types/mealEntries.types"
import { Meals } from "./types/meals.types"

interface MealsProps {
  meals: Meals
  mealEntries: MealEntries
  foodItems: FoodItems
}

function Meals({ meals, mealEntries, foodItems }: MealsProps) {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-xl text-semibold">
        Meals
      </span>
      <MealList
        meals={meals}
        mealEntries={mealEntries}
        foodItems={foodItems}
      />
    </div>
  )
}

export default Meals