import FoodItemList from "./FoodItemList"
import { FoodItems } from "./types/foodItem.types"

interface FoodItemsProps {
  foodItems: FoodItems
}

function FoodItems ({ foodItems }: FoodItemsProps) {
  return (
    <>
      Food Items
      <FoodItemList foodItems={foodItems} />
    </>
  )
}

export default FoodItems