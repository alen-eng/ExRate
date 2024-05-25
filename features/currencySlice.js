import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currencies:[],
  currencyData:[],
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    addtoCurrencyList: (state,action) => {
      state.currencies = [...state.currencies,action.payload]
    },
    addCurrencyData: (state,action) => {
      state.currencyData = [...state.currencyData,action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoCurrencyList , addCurrencyData} = currencySlice.actions;

export const selectCurrency = state => state.currency.currencies;

export const selectCurrencyData = state => state.currency.currencyData;

export default currencySlice.reducer;