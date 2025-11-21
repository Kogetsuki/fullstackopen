import { configureStore } from "@reduxjs/toolkit";
import diagnoseReducer from './reducers/diagnoseReducer';


const store = configureStore({
  reducer: {
    diagnoses: diagnoseReducer
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;