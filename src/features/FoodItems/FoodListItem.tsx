import { FoodItem } from "./types/foodItem.types"

interface FoodListItem {
  foodItem: FoodItem
}

function FoodListItem ({ foodItem }: FoodListItem) {
  return (
    <li className="flex flex-row border border-slate-500 p-3 rounded-md my-1 w-[360px]">
      <span className="flex flex-col text-xs text-slate-500 pr-2 flex-1">
        Name
        <span className="text-lg text-slate-800">
          {foodItem.foodName.length > 10 ? foodItem.foodName.slice(0, 9).concat('...') : foodItem.foodName}
        </span>
      </span>
      
      <span className="flex flex-col text-xs text-slate-500 border-l-2 border-slate-400 items-center px-2">
        Calories (S)
        <span className="text-lg text-slate-800">
        {foodItem.caloriesPerServing}
        </span>
      </span>
      
      <span className="flex flex-col text-xs text-slate-500 border-l-2 border-slate-400 items-center pl-2">
        Serving (g)
        <span className="text-lg text-slate-800">
        {foodItem.servingSizeInGrams}
        </span>
      </span>
    </li>
  )
}

export default FoodListItem