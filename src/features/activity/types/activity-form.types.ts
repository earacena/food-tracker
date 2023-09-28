import { z } from 'zod';

export const zActivityFormSchema = z
  .object({
    mealId: z.coerce.number().optional(),
    foodItemId: z.coerce.number().optional(),
    quantityInGrams: z.coerce.number().optional(),
    quantityInUnits: z.coerce.number().optional(),
  })
  .transform((o) => ({
    mealId: o.mealId,
    foodItemId: o.foodItemId,
    quantityInGrams: o.quantityInGrams,
    quantityInUnits: o.quantityInUnits,
  }));

export type ActivityFormSchema = z.infer<typeof zActivityFormSchema>;
