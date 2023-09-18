import Meal from "./Meal"
import { MealEntries } from "./types/mealEntries.types"
import { Meals } from "./types/meals.types"

interface MealsProps {
  meals: Meals
  mealEntries: MealEntries
}

function Meals({ meals, mealEntries }: MealsProps) {
  return (
    <>
      Meals
      <ul>
        {meals.map((m) => (
          <Meal key={m.id} meal={m} mealEntries={mealEntries.filter((me) => me.mealId === m.id)} />
        ))}
      </ul>
    </>
  )
}

export default Meals