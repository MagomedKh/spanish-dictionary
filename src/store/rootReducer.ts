import { combineReducers } from "redux";
import { cardsSlice } from "./slices/CollectionsSlice";

export const rootReducer = combineReducers({ cards: cardsSlice.reducer });
