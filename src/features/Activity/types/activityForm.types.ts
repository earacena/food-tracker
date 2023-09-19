import { z } from "zod";

export const zActivityFormSchema = z.object({
  mealId: z.coerce.number().optional(),
  foodItemId: z.coerce.number().optional(),
  quantity: z.coerce.number(),
})

export type ActivityFormSchema = z.infer<typeof zActivityFormSchema>

