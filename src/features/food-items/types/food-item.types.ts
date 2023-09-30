import { z } from 'zod';

export const zFoodItem = z.object({
  id: z.number(),
  foodName: z.string(),
  userId: z.string().uuid(),
  caloriesPerServing: z.number().gte(1),
  servingSizeInGrams: z.number().gte(1),
  searchVisibility: z.enum(['private', 'public']),
  createdAt: z.coerce.date(),
});

export const zFoodItems = z.array(zFoodItem);

export type FoodItem = z.infer<typeof zFoodItem>;
export type FoodItems = z.infer<typeof zFoodItems>;

export const zFoodItemCreateResponse = z.object({
  success: z.boolean(),
  data: z.object({
    newFoodItem: zFoodItem,
  }),
});

export const zFoodItemsFetchByUserIdResponse = z.object({
  success: z.boolean(),
  data: z.object({
    userFoodItems: zFoodItems,
  }),
});
