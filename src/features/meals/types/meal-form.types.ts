import { z } from 'zod';

export const zMealFormSchema = z.object({
  name: z.string(),
});

export type MealFormSchema = z.infer<typeof zMealFormSchema>;
