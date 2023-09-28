import Activities from '../activity/activities'
import CalorieCounter from './calorie-counter'

function Dashboard() {
  return (
    <>
      <CalorieCounter />
      <Activities onlyCurrentDay noPastActivity />
    </>
  )
}

export default Dashboard
