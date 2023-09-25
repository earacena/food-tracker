import MealList from "./MealList"

function Meals() {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-3xl text-semibold">
        Meals
      </span>
      <MealList />
    </div>
  )
}

export default Meals