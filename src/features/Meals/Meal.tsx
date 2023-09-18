import MealEntry from "./MealEntry"
import { MealEntries, } from "./types/mealEntries.types"
import { Meal } from "./types/meals.types"

interface MealProps {
  meal: Meal
  mealEntries: MealEntries
}

function Meal({ meal, mealEntries }: MealProps) {

  return (
    <li>
      {meal.name}
      <ul>
        {mealEntries.map((me) => (
          <MealEntry mealEntry={me} />
        ))}
      </ul>
    </li>
  )
}

export default Meal