import { z } from 'zod';

export const zActivity = z.object({
  id: z.number(),
  userId: z.string(),
  mealId: z.number().nullable(),
  foodItemId: z.number().nullable(),
  quantity: z.number(),
  createdAt: z.coerce.date()
})

export const zActivities = z.array(zActivity)

export type Activity = z.infer<typeof zActivity>
export type Activities = z.infer<typeof zActivities>
