import { z } from 'zod';

export const zActivityFormSchema = z.object({
  mealId: z.coerce.number(),
  foodItemId: z.coerce.number(),
  quantityInGrams: z.coerce.number(),
  quantityInUnits: z.coerce.number(),
});

export type ActivityFormSchema = z.infer<typeof zActivityFormSchema>;
