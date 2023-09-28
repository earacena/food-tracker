import { ActivityList } from './activity-list';

interface ActivitiesProps {
  onlyCurrentDay: boolean;
  noPastActivity: boolean;
}

export function Activities({
  onlyCurrentDay,
  noPastActivity,
}: ActivitiesProps): JSX.Element {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-xl text-semibold">Activities</span>
      <ActivityList
        noPastActivity={noPastActivity}
        onlyCurrentDay={onlyCurrentDay}
      />
    </div>
  );
}
