import { MoreVertical, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logger } from '@/utils/logger';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AuthContext } from '@/features/auth';
import { activityService } from '../activity/api/activity.service';
import { mealService } from './api/meal.service';
import { mealEntryService } from './api/meal-entry.service';
import type { Meal } from './types/meals.types';

interface MealDropdownMenuProps {
  meal: Meal;
}

interface DeleteMutationProps {
  mealId: number;
}

export function MealDropdownMenu({ meal }: MealDropdownMenuProps): JSX.Element {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const removeMeal = useMutation({
    mutationFn: async ({ mealId }: DeleteMutationProps) => {
      await activityService.deleteActivitiesByMealId({
        mealId,
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      });

      await mealEntryService.deleteMealEntriesByMealId({
        mealId,
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      });

      await mealService.deleteMeal({
        mealId,
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userId, auth?.token],
      });

      await queryClient.invalidateQueries({
        queryKey: ['meals', auth?.userId, auth?.token],
      });
    },
    onError: (error) => {
      logger.logError(error);
    },
  });

  return (
    <AlertDialog onOpenChange={setAlertDialogOpen} open={alertDialogOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="p-1">
          <Button className="p-1" variant="ghost">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            &apos;{meal.name}&apos; Meal Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-lg text-red-400">Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete &apos;{meal.name}&apos;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reversed. All activities associated with this
            activity will also be deleted. Are you sure you want to delete this
            meal, its meal entries, and activities referencing it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setAlertDialogOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              removeMeal.mutate({
                mealId: meal.id,
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
