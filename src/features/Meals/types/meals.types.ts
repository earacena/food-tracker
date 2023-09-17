import { z } from "zod";

export const zMeal = z.object({
  id: z.number(),
  userId: z.string().uuid(),
  name: z.string(),
  createdAt: z.coerce.date()
})

export const zMeals = z.array(zMeal)

export type Meal = z.infer<typeof zMeal>
export type Meals = z.infer<typeof zMeals>
