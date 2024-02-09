import { arrayUnion } from "firebase/firestore";
import { takeLatest } from "redux-saga/effects";
import { getCardControler, updateCardControler } from "../../firebase/controlers";
import { ICard } from "../../types/Collection";
import {
   ADD_WORD,
   AddWordAction,
   DELETE_WORD,
   DeleteWordAction,
   EDIT_WORD,
   EditWordAction,
} from "../actionTypes";

export function* watchWords() {
   yield takeLatest(ADD_WORD, addWordSaga);
   yield takeLatest(DELETE_WORD, deleteWordsSaga);
   yield takeLatest(EDIT_WORD, editWordSaga);
}

function* addWordSaga({ payload }: AddWordAction) {
   const word = {
      learnWord: payload.word.learn,
      translate: { en: payload.word.en, ru: payload.word.ru },
      id: crypto.randomUUID().slice(0, 8),
   };

   yield updateCardControler({
      cardId: payload.cardId,
      updatedData: {
         words: arrayUnion(word) as unknown as ICard["words"],
      },
   });
}

function* deleteWordsSaga({ payload }: DeleteWordAction) {
   const card: ICard = yield getCardControler(payload.cardId);

   const filteredWords = card.words.filter((word) => word.id !== payload.wordId);

   updateCardControler({ cardId: payload.cardId, updatedData: { words: filteredWords } });
}

function* editWordSaga({ payload }: EditWordAction) {
   const card: ICard = yield getCardControler(payload.cardId);
   const words = card.words;

   const editWordId = words.findIndex((word) => word.id === payload.word.id);
   words[editWordId] = payload.word;

   updateCardControler({ cardId: payload.cardId, updatedData: { words } });
}

export const addWord = (payload: AddWordAction["payload"]): AddWordAction => ({
   type: ADD_WORD,
   payload,
});
export const deleteWord = (payload: DeleteWordAction["payload"]): DeleteWordAction => ({
   type: DELETE_WORD,
   payload,
});
export const editWord = (payload: EditWordAction["payload"]): EditWordAction => ({
   type: EDIT_WORD,
   payload,
});
