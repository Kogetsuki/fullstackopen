import { z } from 'zod';
import { NewDiaryEntry, Weather, Visibility } from './types';


export const newEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional()
});


export const toNewDiaryEntry = (object: unknown): NewDiaryEntry =>
  newEntrySchema.parse(object);


export default toNewDiaryEntry;