import { Plus as PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFoodItems } from '../food-items/hooks/food-item.hooks';
import { useMeals } from '../meals/hooks/use-meals';
import { useMealEntries } from '../meals/hooks/use-meal-entries';
import { MealActivityListItem } from './meal-activity-food-item';
import { FoodItemActivityListItem } from './food-item-activity-list-item';
import type { Activity } from './types/activity.types';
import { useActivities } from './hooks/use-activities';

interface ActivityListProps {
  todayHeader: boolean;
  pastActivity: boolean;
}

export function ActivityList({
  todayHeader,
  pastActivity,
}: ActivityListProps): JSX.Element {
  const navigate = useNavigate();
  const { data: foodItems } = useFoodItems();
  const { data: meals } = useMeals();
  const { data: mealEntries } = useMealEntries();
  const { data: activities, isLoading } = useActivities();

  function sameDayFilter(a: Activity): boolean {
    return isSameDay(a.createdAt, new Date());
  }

  function notSameDayFilter(a: Activity): boolean {
    return !sameDayFilter(a);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <Button className="my-1" disabled>
          <PlusIcon />
          Add New Activity
        </Button>
        {todayHeader ? (
          <span className="my-3">Today&apos;s Activities</span>
        ) : null}
        <Skeleton className="w-[360px] h-24 m-2" />
        <Skeleton className="w-[360px] h-24 m-2" />
        {pastActivity ? <span className="my-3">Past Activities</span> : null}
        <Skeleton className="w-[360px] h-24 m-2" />
        <Skeleton className="w-[360px] h-24 m-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        className="my-1"
        onClick={() => {
          navigate('/activities/form');
        }}
      >
        <PlusIcon />
        Add New Activity
      </Button>

      {todayHeader ? (
        <span className="my-3">Today&apos;s Activities</span>
      ) : null}

      {activities ? (
        <ul>
          {activities.filter(sameDayFilter).length === 0 && (
            <span className="text-sm text-slate-500 my-5">
              Nothing here, record some activity!
            </span>
          )}

          {activities.filter(sameDayFilter).map((a) => {
            if (a.foodItemId) {
              return (
                <FoodItemActivityListItem
                  activity={a}
                  foodItem={foodItems?.find((f) => a.foodItemId === f.id)}
                  key={a.id}
                />
              );
            }
            return (
              <MealActivityListItem
                activity={a}
                foodItems={foodItems}
                key={a.id}
                meal={meals?.find((m) => m.id === a.mealId)}
                mealEntries={mealEntries?.filter(
                  (me) => me.mealId === a.mealId,
                )}
              />
            );
          })}
        </ul>
      ) : null}

      {pastActivity &&
      activities &&
      activities.filter(notSameDayFilter).length > 0 ? (
        <span className="my-3">Past Activities</span>
      ) : null}

      {pastActivity ? (
        <ul>
          {activities?.filter(notSameDayFilter).map((a) => {
            if (a.foodItemId) {
              return (
                <FoodItemActivityListItem
                  activity={a}
                  foodItem={foodItems?.find((f) => f.id === a.foodItemId)}
                  key={a.id}
                />
              );
            }

            return (
              <MealActivityListItem
                activity={a}
                foodItems={foodItems}
                key={a.id}
                meal={meals?.find((m) => m.id === a.mealId)}
                mealEntries={mealEntries?.filter(
                  (me) => me.mealId === a.mealId,
                )}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
