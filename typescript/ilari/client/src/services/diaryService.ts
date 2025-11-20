import axios from "axios";
import type { BackendErrorResponse, DiaryEntry, NewDiaryEntry } from '../types';


const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = () =>
  axios.get<DiaryEntry[]>(baseUrl)
    .then(res =>
      res.data);


const addDiary = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const res = await axios.post<DiaryEntry>(baseUrl, object);
    return res.data;
  }
  catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as BackendErrorResponse;
      if (data.error?.[0]?.message)
        throw new Error(
          `Incorrect ${data.error[0].path}: ${data.error[0].received}\n
          Expected ${data.error[0].options}`
        );
    }
    throw new Error("Failed to add diary");
  }
};


export default {
  getAllDiaries,
  addDiary
};