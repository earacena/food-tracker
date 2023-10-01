import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { logger } from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AuthContext } from '@/features/auth/';
import { profileService } from './api/profile.service';
import { zProfileFormSchema } from './types/profile-form.types';
import type { ProfileFormSchemaType } from './types/profile-form.types';
import { useProfile } from './hooks/use-profile';

export function ProfileForm(): JSX.Element {
  const auth = useContext(AuthContext);
  const { data: userProfile } = useProfile();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile !== undefined && userProfile !== null) {
      navigate('/');
    }
  }, [navigate, userProfile]);

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(zProfileFormSchema),
    defaultValues: {
      dailyCalorieGoal: 2000,
    },
  });

  const addProfile = useMutation({
    mutationFn: (values: ProfileFormSchemaType) =>
      profileService.create({
        ...values,
        userId: auth?.userId,
        token: auth?.token,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['profile', auth?.userId, auth?.token],
      });

      navigate('/');
    },
    onError: (error) => {
      setLoading(false);
      logger.logError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  function onSubmit(values: ProfileFormSchemaType): void {
    setLoading(true);
    addProfile.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col mx-auto space-y-8 my-9 w-[360px] p-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <h2 className="self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Create a new profile
        </h2>
        <FormField
          control={form.control}
          name="dailyCalorieGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Calorie Goal</FormLabel>
              <FormControl>
                <Input placeholder="2000" {...field} />
              </FormControl>
              <FormDescription>
                This is the amount of calories you would like to consume every
                day.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
