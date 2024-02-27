import { CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toggle } from '@/components/ui/toggle';
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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex flex-row mb-8">
        {mainHeader ? (
          <span className="text-3xl text-semibold self-center">Activities</span>
        ) : null}

        {mainHeader ? (
          <Toggle
            className="self-end"
            onClick={() => {
              navigate('/activities/calendar');
            }}
            pressed={false}
          >
            <CalendarDays />
          </Toggle>
        ) : null}
      </div>
      <ActivityList
        formButton
        pastActivity={pastActivity}
        todayHeader={todayHeader}
      />
    </div>
  );
}
