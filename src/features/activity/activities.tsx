import { ActivityList } from './activity-list';

interface ActivitiesProps {
  mainHeader: boolean;
  todayHeader: boolean;
  pastActivity: boolean;
}

export function Activities({
  mainHeader,
  todayHeader,
  pastActivity,
}: ActivitiesProps): JSX.Element {
  return (
    <div className="flex flex-col items-center mx-auto">
      {mainHeader ? (
        <span className="text-3xl text-semibold">Activities</span>
      ) : null}
      <ActivityList pastActivity={pastActivity} todayHeader={todayHeader} />
    </div>
  );
}
