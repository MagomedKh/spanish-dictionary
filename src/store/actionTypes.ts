import { PayloadAction } from "@reduxjs/toolkit";
import { ICard, IWord } from "../types/Collection";

export const CREATE_CARD = "CREATE_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const EDIT_CARD = "EDIT_CARD";

export const ADD_WORD = "ADD_WORD";
export const EDIT_WORD = "EDIT_WORD";
export const DELETE_WORD = "DELETE_WORD";

export type CreateCardAction = PayloadAction<ICard, typeof CREATE_CARD>;
export type EditCardAction = PayloadAction<
   {
      id: string;
      infoData: Pick<ICard, "coverImage" | "title">;
   },
   typeof EDIT_CARD
>;
export type DeleteCardAction = PayloadAction<string, typeof DELETE_CARD>;

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
