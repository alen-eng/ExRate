import { configureStore } from "@reduxjs/toolkit";
import currecyReducer from "./features/currencySlice";

export default configureStore({
    reducer: {
       currency: currecyReducer,
    },
});