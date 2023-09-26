import z from 'zod'

export const zErrorResponse = z.object({
  success: z.boolean(),
  errorMessage: z.string(),
})

export interface AuthenticationProps {
  userId: string | undefined,
  token: string | undefined,
}