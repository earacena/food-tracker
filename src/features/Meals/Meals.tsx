import { Meals } from "./types/meals.types"

interface MealsProps {
  meals: Meals
}

function Meals({ meals }: MealsProps) {
  return (
    <ul>
      {meals.map((m) => (
        <li key={m.id}>
          meal item
        </li>
      ))}
    </ul>
  )
}

export default Meals