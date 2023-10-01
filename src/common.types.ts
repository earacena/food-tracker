import { z } from 'zod';

export const zErrorResponse = z.object({
  success: z.boolean(),
  errorMessage: z.string(),
});

export interface ServiceProps {
  userId: string | null;
  token: string | null;
}
