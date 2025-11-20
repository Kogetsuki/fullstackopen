import { useState } from "react";

import { useField, useRadio } from "../hooks";
import diaryService from "../services/diaryService";
import { Visibility, Weather, type DiaryEntry, type NewDiaryEntry } from "../types";


const DiaryForm = ({ createDiary }: { createDiary: (d: DiaryEntry) => void; }) => {
  const date = useField('date');
  const visibility = useRadio<Visibility>('visibility', Object.values(Visibility));
  const weather = useRadio<Weather>('weather', Object.values(Weather));
  const comment = useField('text');

  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const newDiary: NewDiaryEntry = {
      date: date.value,
      visibility: visibility.value as Visibility,
      weather: weather.value as Weather,
      comment: comment.value
    };

    try {
      const created: DiaryEntry = await diaryService.addDiary(newDiary);
      createDiary(created);
    }
    catch (error: unknown) {
      if (error instanceof Error)
        setError(error.message);
      else
        setError('Unkonw error');
    }

    date.reset();
    visibility.reset();
    weather.reset();
    comment.reset();
  };


  return (
    <>
      <h1>Add new entry</h1>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          Date <input {...date.input} />
        </div>

        <div>
          Visibility
          {visibility.inputs.map(r => (
            <label key={r.id}>
              <input {...r} />
              {r.value}
            </label>
          ))}
        </div>

        <div>
          Weather
          {weather.inputs.map(r => (
            <label key={r.id}>
              <input {...r} />
              {r.value}
            </label>
          ))}
        </div>

        <div>
          Comment <input {...comment.input} />
        </div>

        <button type='submit'>
          Add
        </button>
      </form>
    </>
  );
};


export default DiaryForm;