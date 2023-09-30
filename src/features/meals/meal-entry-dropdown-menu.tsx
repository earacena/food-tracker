import { MoreVertical, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { logger } from '@/utils/logger';
import { AuthContext } from '@/features/auth';
import type { FoodItem } from '../food-items/types/food-item.types';
import { mealEntryService } from './api/meal-entry.service';
import type { MealEntry } from './types/meal-entries.types';

interface MealEntryDropdownMenuProps {
  mealEntry: MealEntry;
  foodItem: FoodItem;
}

interface DeleteMutationProps {
  mealEntryId: number;
}

export function MealEntryDropdownMenu({
  mealEntry,
  foodItem,
}: MealEntryDropdownMenuProps): JSX.Element {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const removeMealEntry = useMutation({
    mutationFn: ({ mealEntryId }: DeleteMutationProps) =>
      mealEntryService.deleteMealEntry({
        mealEntryId,
        userId: auth?.userId,
        token: auth?.token,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userId, auth?.token],
      });
    },
    onError: (error) => {
      logger.logError(error);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-1" variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          &apos;{foodItem.foodName}&apos; Entry Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              removeMealEntry.mutate({
                mealEntryId: mealEntry.id,
              });
            }}
          >
            <Trash className="mr-2 h-4 w-4 text-red-400" />
            <span className="text-lg text-red-400">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
