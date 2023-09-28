import { z } from 'zod';

export const zMealEntryFormSchema = z.object({
  foodItemId: z.coerce.number(),
  quantity: z.coerce.number(),
});

export type MealEntryFormSchema = z.infer<typeof zMealEntryFormSchema>;
