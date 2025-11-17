import diaryData from '../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';


const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] =>
  diaries;


const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));


const addDiary = () =>
  null;


export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
};