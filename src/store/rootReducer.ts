import { combineReducers } from "redux";
import { dictionariesSlice } from "./slices/DictionariesSlice";

export const rootReducer = combineReducers({ dictionaries: dictionariesSlice.reducer });
