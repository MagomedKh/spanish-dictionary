import { PayloadAction } from "@reduxjs/toolkit";
import { IDictionary, IWord } from "../types/Dictionary";

export const CREATE_CARD = "CREATE_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const EDIT_CARD = "EDIT_CARD";

export const ADD_WORD = "ADD_WORD";
export const EDIT_WORD = "EDIT_WORD";
export const DELETE_WORD = "DELETE_WORD";

export type CreateDictionaryAction = PayloadAction<IDictionary, typeof CREATE_CARD>;
export type EditDictionaryAction = PayloadAction<
   {
      id: string;
      infoData: Pick<IDictionary, "coverImage" | "title">;
   },
   typeof EDIT_CARD
>;
export type DeleteDictionaryAction = PayloadAction<string, typeof DELETE_CARD>;

export type AddWordAction = PayloadAction<
   { cardId: string; word: { learn: string; en: string; ru: string } },
   typeof ADD_WORD
>;
export type DeleteWordAction = PayloadAction<
   {
      cardId: string;
      wordId: string;
   },
   typeof DELETE_WORD
>;
export type EditWordAction = PayloadAction<
   {
      cardId: string;
      word: IWord;
   },
   typeof EDIT_WORD
>;
