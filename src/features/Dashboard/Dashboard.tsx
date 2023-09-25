import Activities from "../Activity/Activities"
import CalorieCounter from "./CalorieCounter"

function Dashboard() {
  return (
    <>
      <CalorieCounter />
      <Activities onlyCurrentDay noPastActivity />
    </>
  )
}

export default Dashboard
