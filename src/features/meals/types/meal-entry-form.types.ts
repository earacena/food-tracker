import { z } from 'zod';

export const zMealEntryFormSchema = z.object({
  foodItemId: z.coerce.number(),
  quantityInUnits: z.coerce.number(),
  quantityInGrams: z.coerce.number(),
});

export type MealEntryFormSchema = z.infer<typeof zMealEntryFormSchema>;
