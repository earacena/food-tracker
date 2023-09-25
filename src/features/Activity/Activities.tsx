import ActivityList from "./ActivityList"

interface ActivitiesProps {
  onlyCurrentDay: boolean
  noPastActivity: boolean
}

function Activities ({ onlyCurrentDay, noPastActivity }: ActivitiesProps) {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-xl text-semibold">
        Activities
      </span>
      <ActivityList
        onlyCurrentDay={onlyCurrentDay}
        noPastActivity={noPastActivity}
      />
    </div>
  )
}

export default Activities