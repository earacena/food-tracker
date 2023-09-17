import { z } from 'zod'

export const zFoodItemFormSchema = z.object({
  foodName: z.string(),
  caloriesPerServing: z.number(),
  servingSizeInGrams: z.number(),
  servingSizeInUnits: z.number(),
  searchVisibility: z.enum(['private', 'public']),
})

export type FoodItemFormSchema = z.infer<typeof zFoodItemFormSchema>
