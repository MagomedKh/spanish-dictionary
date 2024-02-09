import { arrayUnion } from "firebase/firestore";
import { takeLatest } from "redux-saga/effects";
import { getDictionaryControler, updateDictionaryControler } from "../../firebase/controlers";
import { IDictionary } from "../../types/Dictionary";
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

   yield updateDictionaryControler({
      cardId: payload.cardId,
      updatedData: {
         words: arrayUnion(word) as unknown as IDictionary["words"],
      },
   });
}

function* deleteWordsSaga({ payload }: DeleteWordAction) {
   const dictionary: IDictionary = yield getDictionaryControler(payload.cardId);

   const filteredWords = dictionary.words.filter((word) => word.id !== payload.wordId);

   updateDictionaryControler({ cardId: payload.cardId, updatedData: { words: filteredWords } });
}

function* editWordSaga({ payload }: EditWordAction) {
   const dictionary: IDictionary = yield getDictionaryControler(payload.cardId);
   const words = dictionary.words;

   const editWordId = words.findIndex((word) => word.id === payload.word.id);
   words[editWordId] = payload.word;

   updateDictionaryControler({ cardId: payload.cardId, updatedData: { words } });
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
