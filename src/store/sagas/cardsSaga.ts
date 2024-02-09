import { PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { call, takeLatest } from "redux-saga/effects";
import { db } from "../../firebase/firebase";
import {
   CREATE_CARD,
   CreateCardAction,
   DELETE_CARD,
   DeleteCardAction,
   EDIT_CARD,
   EditCardAction,
} from "../actionTypes";

export function* watchCards() {
   yield takeLatest(CREATE_CARD, createCardSaga);
   yield takeLatest(DELETE_CARD, deleteCardSaga);
   yield takeLatest(EDIT_CARD, editCardSaga);
}

function* createCardSaga({ payload: card }: CreateCardAction) {
   const { id } = card;
   yield call(() => setDoc(doc(db, "cards", id), card));
}

function* deleteCardSaga({ payload: id }: PayloadAction<string>) {
   yield call(() => deleteDoc(doc(db, "cards", id)));
}

function* editCardSaga({ payload }: EditCardAction) {
   yield call(() =>
      updateDoc(doc(db, "cards", payload.id), {
         title: payload.infoData.title,
         coverImage: payload.infoData.coverImage,
      })
   );
}

export const createCard = (card: CreateCardAction["payload"]): CreateCardAction => ({
   type: CREATE_CARD,
   payload: card,
});
export const deleteCard = (payload: DeleteCardAction["payload"]): DeleteCardAction => ({
   type: DELETE_CARD,
   payload,
});
export const editCard = (payload: EditCardAction["payload"]): EditCardAction => ({
   type: EDIT_CARD,
   payload,
});
