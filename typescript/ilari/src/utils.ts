import { z } from 'zod';
import { Weather, Visibility, NewDiaryEntry } from './types';


export const NewEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional()
});


export const toNewDiaryEntry = (object: unknown): NewDiaryEntry =>
  NewEntrySchema.parse(object);