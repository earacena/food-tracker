import { z } from "zod";

export const zActivityFormSchema = z.object({
  mealId: z.coerce.number().optional(),
  foodItemId: z.coerce.number().optional(),
  quantity: z.coerce.number(),
}).transform((o) => ({
  mealId: o.mealId,  
  foodItemId: o.foodItemId,
  quantity: o.quantity
}))

export type ActivityFormSchema = z.infer<typeof zActivityFormSchema>

