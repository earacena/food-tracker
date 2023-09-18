import { z } from "zod"

export const zMealEntry = z.object({
  id: z.number(),
  userId: z.string().uuid(),
  foodItemId: z.number(),
  mealId: z.number(),
  quantity: z.number()
})

export const zMealEntries = z.array(zMealEntry)

export type MealEntry = z.infer<typeof zMealEntry>
export type MealEntries = z.infer<typeof zMealEntries>

export const zMealEntriesFetchByUserIdResponse = z.object({
  success: z.boolean(),
  data: z.object({
    userMealEntries: zMealEntries
  })
})