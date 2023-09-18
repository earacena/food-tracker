import { z } from "zod";

export const zActivityFormSchema = z.object({
  mealId: z.number().optional(),
  foodItemId: z.number().optional(),
  quantity: z.number(),
})

export type ActivityFormSchema = z.infer<typeof zActivityFormSchema>

