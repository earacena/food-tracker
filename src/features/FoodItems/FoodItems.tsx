import FoodItemList from "./FoodItemList"
import { FoodItems } from "./types/foodItem.types"

interface FoodItemsProps {
  foodItems: FoodItems
}

function FoodItems ({ foodItems }: FoodItemsProps) {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-xl text-semibold">
        Food Items
      </span>
      <FoodItemList foodItems={foodItems} />
    </div>
  )
}

export default FoodItems