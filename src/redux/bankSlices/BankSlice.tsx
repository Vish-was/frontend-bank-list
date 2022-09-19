import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = {
  bankDetails: []
};

export const BankSlice = createSlice({
  name: 'bankSlice',
  initialState,
  reducers: {
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
  },
});

export const bankDetails = (state: RootState) => state.bank.bankDetails;
export const { setBankDetails } = BankSlice.actions;
export default BankSlice.reducer;
