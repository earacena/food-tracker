import { MoreVertical, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
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
import { AuthContext } from '@/features/auth';
import type { FoodItem } from './types/food-item.types';
import { foodItemService } from './api/food-item.service';

interface FoodItemDropdownMenuProps {
  foodItem: FoodItem;
}

interface DeleteMutationProps {
  foodItemId: number;
}

export function FoodItemDropdownMenu({
  foodItem,
}: FoodItemDropdownMenuProps): JSX.Element {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const removeFoodItem = useMutation({
    mutationFn: async ({ foodItemId }: DeleteMutationProps) => {
      await foodItemService.deleteFoodItem({
        foodItemId,
        userId: auth?.userId,
        token: auth?.token,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['foodItems', auth?.userId, auth?.token],
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
          &apos;{foodItem.foodName}&apos; Item Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              removeFoodItem.mutate({
                foodItemId: foodItem.id,
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
