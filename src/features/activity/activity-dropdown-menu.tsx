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
import { activityService } from './api/activity.service';
import type { Activity } from './types/activity.types';

interface ActivityDropdownMenuProps {
  activity: Activity;
}

interface DeleteMutationProps {
  activityId: number;
}

export function ActivityDropdownMenu({
  activity,
}: ActivityDropdownMenuProps): JSX.Element {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const authUser = useContext(AuthContext);
  const queryClient = useQueryClient();

  const removeActivity = useMutation({
    mutationFn: async ({ activityId }: DeleteMutationProps) => {
      await activityService.deleteActivity({
        activityId,
        userId: authUser?.userId ?? null,
        token: authUser?.token ?? null,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities', authUser?.userId, authUser?.token],
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
        <DropdownMenuContent className="w-56" sideOffset={0}>
          <DropdownMenuLabel className="">Activity Options</DropdownMenuLabel>
          <DropdownMenuSeparator className="" />
          <DropdownMenuGroup>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="">
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-lg text-red-400">Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reversed. Are you sure you want to delete this
            activity?
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
              removeActivity.mutate({
                activityId: activity.id,
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
