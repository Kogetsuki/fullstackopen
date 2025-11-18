import express, { Request, Response } from 'express';

import diaryService from '../services/diaryService';
import { newDiaryParser, errorMiddleware } from '../middleware';
import { DiaryEntry, NewDiaryEntry } from '../types';


const router = express.Router();


router.get('/', (_req, res) =>
  res.send(diaryService.getNonSensitiveEntries()));


router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary)
    res.send(diary);
  else
    res.sendStatus(404);
});


router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});


router.use(errorMiddleware);


export default router;