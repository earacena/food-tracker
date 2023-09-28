import { z } from 'zod';

export const zProfile = z.object({
  userId: z.string().uuid(),
  dailyCalorieGoal: z.number().nullable(),
  createdAt: z.coerce.date(),
});

export const zProfiles = z.array(zProfile);

export const zProfileDetails = z.object({
  userId: z.string().uuid(),
  dailyCalorieGoal: z.number().nullable(),
});

export const zProfileUpdatableFields = z.object({
  dailyCalorieGoal: z.number().nullable(),
});

export type Profile = z.infer<typeof zProfile>;
export type Profiles = z.infer<typeof zProfiles>;

export const zProfileFetchResponse = z.object({
  success: z.boolean(),
  data: z.object({
    userProfile: zProfile,
  }),
});

export const zProfileCreateResponse = z.object({
  success: z.boolean(),
  data: z.object({
    newProfile: zProfile,
  }),
});
