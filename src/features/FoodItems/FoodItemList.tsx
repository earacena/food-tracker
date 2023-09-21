import { Button } from "@/components/ui/Button"
import FoodListItem from "./FoodListItem"
import { FoodItems } from "./types/foodItem.types"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface FoodItemListProps {
  foodItems: FoodItems
}

function FoodItemList({ foodItems }: FoodItemListProps) {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center">
      {
        foodItems.length === 0 && (
          <span className="text-sm text-slate-500 my-5">Nothing here, add some items!</span>
        )
      }
      <Button className="my-2" onClick={() => navigate('/foodItems/form')}>
        <PlusIcon />
        Add Food Item
      </Button>

      {
        foodItems && (
          <ul>
            {foodItems && foodItems.map((f) => (
              <FoodListItem key={f.id} foodItem={f} />
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default FoodItemList