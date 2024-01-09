import type { FirebaseOptions } from 'firebase/app';
import { z } from 'zod';
import { logger } from './logger';

export const firebaseConfig: FirebaseOptions = {
  apiKey: z.string().parse(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: z.string().parse(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: z.string().parse(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: z.string().parse(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: z
    .string()
    .parse(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: z.string().parse(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: z.string().parse(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

logger.log('Using firebase config: ', firebaseConfig);
