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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AuthContext } from '@/features/auth';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const removeMeal = useMutation({
    mutationFn: async ({ mealId }: DeleteMutationProps) => {
      await mealEntryService.deleteMealEntriesByMealId({
        mealId,
        userId: auth?.userId,
        token: auth?.token,
      });

      await mealService.deleteMeal({
        mealId,
        userId: auth?.userId,
        token: auth?.token,
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
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
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
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-lg text-red-400">Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete &apos;{meal.name}&apos;?
          </DialogTitle>
          <DialogDescription>
            This action cannot be reversed. All activities associated with this
            activity will also be deleted. Are you sure you want to delete this
            meal, its meal entries, and activities referencing it?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="font-bold text-red-600"
            onClick={() => {
              removeMeal.mutate({
                mealId: meal.id,
              });
            }}
            type="button"
            variant="secondary"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
