import z from 'zod'

export const zErrorResponse = z.object({
  success: z.boolean(),
  errorMessage: z.string(),
})