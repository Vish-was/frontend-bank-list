import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bankReducer from '../redux/bankSlices/BankSlice';

export const store = configureStore({
  reducer: {
    bank: bankReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
