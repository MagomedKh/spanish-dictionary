import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardsSchema } from "../../types/CardsSchema";
import { ICard } from "../../types/Collection";
import { RootState } from "../store";

const initialState: CardsSchema = {
   entities: [],
   isLoading: false,
};

export const cardsSlice = createSlice({
   name: "cards",
   initialState,
   reducers: {
      setCards: (state, { payload }: PayloadAction<ICard[]>) => {
         state.entities = payload;
         state.isLoading = false;
      },
      addCard: (state, { payload }: PayloadAction<ICard>) => {
         state.entities.push(payload);
      },
      openCard: (state, { payload }: PayloadAction<ICard>) => {
         state.currentCard = payload;
      },
      setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
         state.isLoading = payload;
      },
   },
});

export const selectCards = (state: RootState) => state.cards.entities;
export const selectCurrentCard = (state: RootState) => state.cards.currentCard;
export const selectCurrentCardId = (state: RootState) => state.cards.currentCard?.id;
export const selectIsLoading = (state: RootState) => state.cards.isLoading;

export const { setCards, addCard, openCard, setIsLoading } = cardsSlice.actions;
