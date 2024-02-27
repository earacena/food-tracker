import { z } from 'zod';

const url = import.meta.env.DEV
  ? z.string().parse(import.meta.env.VITE_DEV_BACKEND_URL ?? '')
  : z.string().parse(import.meta.env.VITE_PROD_BACKEND_URL ?? '');

export const baseUrl =
  import.meta.env.MODE === 'test' ? 'http://localhost:3001' : url;
