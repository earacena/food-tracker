import { z } from 'zod'

export const zProfileFormSchema = z.object({
  dailyCalorieGoal: z.coerce.number().gte(1).lte(9999)
})

export type ProfileFormSchemaType = z.infer<typeof zProfileFormSchema>