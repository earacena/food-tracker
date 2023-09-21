import { Button } from "@/components/ui/Button"
import { type FoodItems } from "../FoodItems/types/foodItem.types"
import MealListItem from "./MealListItem"
import { type MealEntries } from "./types/mealEntries.types"
import { type Meals } from "./types/meals.types"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface MealListProps {
  meals: Meals
  mealEntries: MealEntries
  foodItems: FoodItems
}

function MealList({ meals, mealEntries, foodItems }: MealListProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      {
        meals.length === 0 && (
          <span className="text-sm text-slate-500 my-5">
            Nothing here, add some meals!
          </span>
        )
      }

      <Button onClick={() => navigate('/meals/form')} className="my-3">
        <PlusIcon />
        Add New Meal
      </Button>

      {
        meals && (
          <ul>
            {meals.map((m) => (
              <MealListItem
                key={m.id}
                meal={m}
                mealEntries={mealEntries.filter((me) => me.mealId === m.id)}
                foodItems={foodItems}
              />
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default MealList