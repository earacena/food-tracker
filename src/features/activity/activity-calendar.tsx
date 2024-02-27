import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Calendar } from '@/components/ui/calendar';
import { useActivities } from './hooks/use-activities';
import { ActivityList } from './activity-list';

export function ActivityCalendar(): JSX.Element {
  const navigate = useNavigate();
  const { data: activities } = useActivities();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const allEntryDates = activities?.map((a) => a.createdAt);

  function handleSelect(day: Date): void {
    setSelectedDate(day);
  }

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex flex-row mb-8">
        <span className="text-3xl text-semibold self-center">Activities</span>
        <Toggle
          className="flex-grow"
          onClick={() => {
            navigate(-1);
          }}
          pressed
        >
          <CalendarDays />
        </Toggle>
      </div>

      <Calendar onDayClick={handleSelect} selected={allEntryDates} />
      <span className="my-4">
        Activities recorded on {selectedDate.toDateString()}
      </span>
      <ActivityList
        date={selectedDate}
        formButton={false}
        pastActivity={false}
        todayHeader={false}
      />
    </div>
  );
}
