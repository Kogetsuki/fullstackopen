import type { DiaryEntry } from "../types";


const DiaryItem = ({ diary }: { diary: DiaryEntry; }) => {
  return (
    <>
      <h3>{diary.date}</h3>
      <div>Visibility: {diary.visibility}</div>
      <div>Weather: {diary.weather}</div>
    </>
  );
};


export default DiaryItem;