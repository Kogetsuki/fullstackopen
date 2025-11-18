import { z } from 'zod';
import { Weather, Visibility } from './types';


export const NewEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional()
});
