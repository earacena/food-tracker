import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logger } from '@/utils/logger';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMeals } from '../meals/hooks/use-meals';
import { useFoodItems } from '../food-items';
import { AuthContext } from '../auth';
import { zActivityFormSchema } from './types/activity-form.types';
import type { ActivityFormSchema } from './types/activity-form.types';
import { activityService } from './api/activity.service';

export function ActivityForm(): JSX.Element {
  const auth = useContext(AuthContext);

  // const { toast } = useToast()
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [consumptionType, setConsumptionType] = useState<string>('');
  const [servingType, setServingType] = useState<string>('');
  const { data: meals } = useMeals();
  const { data: foodItems } = useFoodItems();

  const form = useForm<ActivityFormSchema>({
    resolver: zodResolver(zActivityFormSchema),
    defaultValues: {
      foodItemId: undefined,
      mealId: undefined,
      quantityInGrams: 100,
      quantityInUnits: 1,
    },
  });

  const addActivity = useMutation({
    mutationFn: (values: ActivityFormSchema) =>
      activityService.create({
        ...values,
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities', auth?.userId, auth?.token],
      });
      navigate('/activities');
    },
    onError: (error) => {
      logger.logError(error);
    },
  });

  function onSubmit(values: ActivityFormSchema): void {
    addActivity.mutate(values);
  }

  const noMeals = consumptionType === 'meal' && meals?.length === 0;
  const noFoodItems = consumptionType === 'foodItem' && foodItems?.length === 0;

  return (
    <Form {...form}>
      <form
        className="flex flex-col mx-auto space-y-8 my-9 p-5 w-[360px]"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <h2 className="self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Add new activity
        </h2>
        <FormItem>
          <FormLabel>Consumption type</FormLabel>
          <Select
            onValueChange={(value) => {
              setConsumptionType(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select consumption type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="foodItem">Individual item</SelectItem>
                <SelectItem value="meal">Meal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>The type of consumption activity.</FormDescription>
        </FormItem>

        {consumptionType === 'foodItem' && (
          <>
            <FormField
              control={form.control}
              name="foodItemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Item</FormLabel>
                  <Select
                    defaultValue={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food item consumed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodItems?.map((f) => (
                        <SelectItem key={f.id} value={f.id.toString()}>
                          {f.foodName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is the food item you consumed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Serving Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  setServingType(value);
                  form.reset();
                }}
              >
                <FormControl>
                  <SelectTrigger aria-label="Serving Type">
                    <SelectValue placeholder="Select Serving Type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    <SelectItem value="grams">Grams</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of measurement used for each serving.
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="quantityInGrams"
              render={({ field }) => (
                <FormItem className={servingType === 'grams' ? '' : 'hidden'}>
                  <FormLabel>Quantity (grams)</FormLabel>
                  <FormControl>
                    <Input placeholder="200" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the number of grams consumed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantityInUnits"
              render={({ field }) => (
                <FormItem className={servingType === 'units' ? '' : 'hidden'}>
                  <FormLabel>Quantity (units)</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the number of units of this item consumed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {consumptionType === 'meal' && (
          <>
            <FormField
              control={form.control}
              name="mealId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal</FormLabel>
                  <Select
                    defaultValue={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal consumed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {meals?.map((m) => (
                        <SelectItem key={m.id} value={m.id.toString()}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is the meal you consumed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantityInUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (servings)</FormLabel>
                  <FormControl>
                    <Input placeholder="200" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the number of servings consumed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button disabled={noMeals || noFoodItems} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
