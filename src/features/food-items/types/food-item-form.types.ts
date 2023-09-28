import { z } from 'zod';

export const zFoodItemFormSchema = z.object({
  foodName: z.string().min(3).max(40),
  caloriesPerServing: z.coerce.number(),
  servingSizeInGrams: z.coerce.number(),
  searchVisibility: z.enum(['private', 'public']),
});

export type FoodItemFormSchema = z.infer<typeof zFoodItemFormSchema>;
