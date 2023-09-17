import { z } from 'zod'

export const zFoodItem = z.object({
  id: z.number(),
  foodName: z.string(),
  caloriesPerServing: z.number(),
  servingSizeInGrams: z.number(),
  servingSizeInUnits: z.number(),
  searchVisibility: z.enum(['private', 'public']),
  createdAt: z.coerce.date()
})

export const zFoodItems = z.array(zFoodItem)

export const zFoodItemCreateResponse = z.object({
  success: z.boolean(),
  data: z.object({
    newFoodItem: zFoodItem
  })
})