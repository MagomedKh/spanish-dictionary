import { PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { call, takeLatest } from "redux-saga/effects";
import { db } from "../../firebase/firebase";
import {
   CREATE_CARD,
   CreateDictionaryAction,
   DELETE_CARD,
   DeleteDictionaryAction,
   EDIT_CARD,
   EditDictionaryAction,
} from "../actionTypes";

export function* watchDictionaries() {
   yield takeLatest(CREATE_CARD, createdictionariesaga);
   yield takeLatest(DELETE_CARD, deletedictionariesaga);
   yield takeLatest(EDIT_CARD, editdictionariesaga);
}

function* createdictionariesaga({ payload: dictionary }: CreateDictionaryAction) {
   const { id } = dictionary;
   yield call(() => setDoc(doc(db, "dictionaries", id), dictionary));
}

function* deletedictionariesaga({ payload: id }: PayloadAction<string>) {
   yield call(() => deleteDoc(doc(db, "dictionaries", id)));
}

function* editdictionariesaga({ payload }: EditDictionaryAction) {
   yield call(() =>
      updateDoc(doc(db, "dictionaries", payload.id), {
         title: payload.infoData.title,
         coverImage: payload.infoData.coverImage,
      })
   );
}

export const createDictionary = (
   dictionary: CreateDictionaryAction["payload"]
): CreateDictionaryAction => ({
   type: CREATE_CARD,
   payload: dictionary,
});
export const deleteDictionary = (
   payload: DeleteDictionaryAction["payload"]
): DeleteDictionaryAction => ({
   type: DELETE_CARD,
   payload,
});
export const editDictionary = (payload: EditDictionaryAction["payload"]): EditDictionaryAction => ({
   type: EDIT_CARD,
   payload,
});
