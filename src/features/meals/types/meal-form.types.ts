import { z } from 'zod';

export const zMealFormSchema = z.object({
  name: z.string().min(3).max(40),
});

export type MealFormSchema = z.infer<typeof zMealFormSchema>;
