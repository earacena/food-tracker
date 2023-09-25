import { Button } from "@/components/ui/Button"
import MealListItem from "./MealListItem"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useMeals from "./hooks/useMeals"

function MealList() {
  const navigate = useNavigate()
  const { data: meals } = useMeals()

  return (
    <div className="flex flex-col items-center">
      {
        meals?.length === 0 && (
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
              />
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default MealList