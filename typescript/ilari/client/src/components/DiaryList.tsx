import type { DiaryEntry } from '../types';
import DiaryItem from './DiaryItem';


const DiaryList = ({ diaries }: { diaries: DiaryEntry[]; }) => {
  return (
    <>
      <h1>Diary entries</h1>

      {diaries.map(diary =>
        <div key={diary.id}>
          <DiaryItem diary={diary} />
        </div>
      )}
    </>
  );
};


export default DiaryList;