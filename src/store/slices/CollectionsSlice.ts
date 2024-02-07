import { CardsSchema } from "./../../models/CardsSchema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../models/Collection";
import { RootState } from "../store";

const initialState: CardsSchema = {
   entities: [],
};

export const cardsSlice = createSlice({
   name: "cards",
   initialState,
   reducers: {
      setCards: (state, { payload }: PayloadAction<ICard[]>) => {
         state.entities = payload;
      },
      addCard: (state, { payload }: PayloadAction<ICard>) => {
         state.entities.push(payload);
      },
      openCard: (state, { payload }: PayloadAction<ICard>) => {
         state.currentCard = payload;
      },
   },
});

export const selectCards = (state: RootState) => state.cards.entities;
export const selectCurrentCard = (state: RootState) => state.cards.currentCard;

export const { setCards, addCard, openCard } = cardsSlice.actions;
