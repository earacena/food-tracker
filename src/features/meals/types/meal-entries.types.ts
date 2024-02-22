import { z } from 'zod';

export const zMealEntry = z.object({
  id: z.number(),
  userId: z.string(),
  foodItemId: z.number(),
  mealId: z.number(),
  quantityInGrams: z.number().nullable(),
  quantityInUnits: z.number().nullable(),
});

export const zMealEntries = z.array(zMealEntry);

export type MealEntry = z.infer<typeof zMealEntry>;
export type MealEntries = z.infer<typeof zMealEntries>;

export const zMealEntriesFetchByUserIdResponse = z.object({
  success: z.boolean(),
  data: z.object({
    userMealEntries: zMealEntries,
  }),
});

export const zMealEntryCreateResponse = z.object({
  success: z.boolean(),
  data: z.object({
    newMealEntry: zMealEntry,
  }),
});
