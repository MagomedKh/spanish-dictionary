import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DictionariesSchema } from "../../types/DictionariesSchema";
import { IDictionary } from "../../types/Dictionary";
import { RootState } from "../store";

const initialState: DictionariesSchema = {
   entities: [],
   isLoading: false,
};

export const dictionariesSlice = createSlice({
   name: "dictionaries",
   initialState,
   reducers: {
      setDictionaries: (state, { payload }: PayloadAction<IDictionary[]>) => {
         state.entities = payload;
         state.isLoading = false;
      },
      addDictionary: (state, { payload }: PayloadAction<IDictionary>) => {
         state.entities.push(payload);
      },
      openDictionary: (state, { payload }: PayloadAction<IDictionary>) => {
         state.currentDictionary = payload;
      },
      setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
         state.isLoading = payload;
      },
   },
});

export const selectDictionaries = (state: RootState) => state.dictionaries.entities;
export const selectCurrentDictionary = (state: RootState) => state.dictionaries.currentDictionary;
export const selectCurrentDictionaryId = (state: RootState) =>
   state.dictionaries.currentDictionary?.id;
export const selectIsLoading = (state: RootState) => state.dictionaries.isLoading;

export const { setDictionaries, addDictionary, openDictionary, setIsLoading } =
   dictionariesSlice.actions;
