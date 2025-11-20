export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;


export interface BackendErrorItem {
  received: string;
  code: string;
  options?: string[];
  path?: string[];
  message: string;
}


export interface BackendErrorResponse {
  error: BackendErrorItem[];
}
