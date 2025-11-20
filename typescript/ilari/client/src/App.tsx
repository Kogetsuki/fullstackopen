import { useState, useEffect } from 'react';

import diaryService from './services/diaryService';
import type { DiaryEntry } from './types';

import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  // const [newDiary, setNewDiary] = useState(null);


  useEffect(() => {
    diaryService.getAllDiaries()
      .then(data =>
        setDiaries(data));
  }, []);


  const createDiary = (diary: DiaryEntry) =>
    setDiaries(diaries.concat(diary));


  return (
    <>
      <DiaryForm createDiary={createDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
};


export default App;