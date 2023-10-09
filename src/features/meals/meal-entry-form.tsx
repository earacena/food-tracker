import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFoodItems } from '@/features/food-items';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { logger } from '@/utils/logger';
import { useToast } from '@/components/ui/toast-hook';
import { AuthContext } from '../auth';
import { mealEntryService } from './api/meal-entry.service';
import { useMeals } from './hooks/use-meals';
import {
  type MealEntryFormSchema,
  zMealEntryFormSchema,
} from './types/meal-entry-form.types';

const zMealIdParam = z.object({
  mealId: z.coerce.number(),
});

export function MealEntryForm(): JSX.Element {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: meals } = useMeals();
  const { data: foodItems } = useFoodItems();
  const { mealId } = zMealIdParam.parse(useParams());
  const { toast } = useToast();

  const form = useForm<MealEntryFormSchema>({
    resolver: zodResolver(zMealEntryFormSchema),
    defaultValues: {
      foodItemId: -1,
      quantityInGrams: 0,
      quantityInUnits: 0,
    },
  });

  const addMealEntry = useMutation({
    mutationFn: (values: MealEntryFormSchema) =>
      mealEntryService.create({
        ...values,
        mealId,
        userId: auth?.userId ?? null,
        token: auth?.token ?? null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userId, auth?.token],
      });

      navigate('/meals');
    },
    onError: (error) => {
      logger.logError(error);
    },
  });

  function onSubmit(values: MealEntryFormSchema): void {
    addMealEntry.mutate(values);
  }

  const meal = meals?.find((m) => m.id.toString() === mealId.toString());
  const isValidMeal = meal !== undefined;
  const selectedFoodItemId = form.watch('foodItemId');
  const selectedFoodItem = foodItems?.find(
    (f) => f.id.toString() === selectedFoodItemId.toString(),
  );

  useEffect(() => {
    if (!isValidMeal) {
      toast({
        title: 'Error',
        description: 'Meal does not exist',
        variant: 'destructive',
      });

      navigate('/meals');
    }
  }, [isValidMeal, navigate, toast]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col mx-auto space-y-8 my-9 w-[360px] p-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <h2 className="self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Add new meal entry
        </h2>
        <h3 className="self-center">{meal?.name}</h3>
        <FormField
          control={form.control}
          name="foodItemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food item</FormLabel>
              <Select onValueChange={field.onChange}>
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

        {selectedFoodItem?.servingSizeInGrams ? (
          <FormField
            control={form.control}
            name="quantityInGrams"
            render={({ field }) => (
              <FormItem>
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
        ) : null}

        {selectedFoodItem?.servingSizeInUnits ? (
          <FormField
            control={form.control}
            name="quantityInUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (units)</FormLabel>
                <FormControl>
                  <Input placeholder="200" {...field} />
                </FormControl>
                <FormDescription>
                  This is the number of units consumed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <Button
          disabled={selectedFoodItem === undefined || auth?.token === null}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
