import {
   DocumentData,
   QuerySnapshot,
   addDoc,
   arrayRemove,
   arrayUnion,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   onSnapshot,
   query,
   setDoc,
   updateDoc,
} from "firebase/firestore";
import { call, put, takeEvery } from "redux-saga/effects";
import { db } from "../firebase";
import {
   Action,
   ActionCreatorWithPayload,
   ActionCreatorWithoutPayload,
   PayloadAction,
} from "@reduxjs/toolkit";
import { ICard, IWord } from "../../models/Collection";
import {
   ADD_WORD,
   CREATE_CARD,
   DELETE_CARD,
   DELETE_WORD,
   EDIT_CARD,
   GET_CARDS,
} from "../actionTypes";
import { addCard, setCards } from "../slices/CollectionsSlice";

const cardsCollection = collection(db, "cards");
const cardsRef = doc(db, "cards", "sadf");

export function* createCardWatcher() {
   yield takeEvery(CREATE_CARD, createCardWorker);
   yield takeEvery(DELETE_CARD, deleteCardWorker);
   yield takeEvery(EDIT_CARD, editCardWorker);
   yield takeEvery(ADD_WORD, addWordWorker);
   yield takeEvery(DELETE_WORD, setWordsWorker);
}

function* createCardWorker({ payload }: PayloadAction<ICard>): any {
   const { id } = payload;
   const cardRef = yield call(() => setDoc(doc(db, "cards", id), payload));

   // yield put(addCard({ ...payload, id: cardRef.id }));
}

function* deleteCardWorker({ payload }: PayloadAction<string[]>): any {
   console.log(...payload);
   yield call(() => deleteDoc(doc(db, "cards", ...payload)));
}

function* editCardWorker({
   payload,
}: PayloadAction<Pick<ICard, "id" | "title">>): any {
   yield call(() =>
      updateDoc(doc(db, "cards", payload.id), { title: payload.title })
   );
}

function* addWordWorker({ payload }: PayloadAction<string>) {
   yield call(() =>
      updateDoc(doc(db, "cards", payload), {
         words: arrayUnion({ id: crypto.randomUUID().slice(0, 8) }),
      })
   );
}

function* setWordsWorker({
   payload,
}: PayloadAction<{
   cardId: string;
   words: ICard["words"];
}>) {
   yield call(() =>
      updateDoc(doc(db, "cards", payload.cardId), {
         words: payload.words,
      })
   );
}

// function* deleteWordWorker({
//    payload,
// }: PayloadAction<{ cardId: string; wordId: string }>) {
//    console.log(+payload.wordId);
//    yield call(() =>
//       updateDoc(doc(db, "cards", payload.cardId), {
//          words: arrayRemove(+payload.wordId),
//       })
//    );
// }

// function* getCardsWorker(): any {
//    const querySnapshot: QuerySnapshot<DocumentData> = yield getDocs(
//       query(cardsCollection)
//    );

//    const cards = querySnapshot.docs.map((doc) => doc.data() as ICard);
//    yield put(setCards(cards));
// }

export const createCard = (card: ICard): PayloadAction<ICard> => ({
   type: CREATE_CARD,
   payload: card,
});
export const getCards = (): Action => ({
   type: GET_CARDS,
});
export const deleteCard = (...pathItems: string[]) => ({
   type: DELETE_CARD,
   payload: pathItems,
});
export const editCard = (data: Pick<ICard, "id" | "title">) => ({
   type: EDIT_CARD,
   payload: data,
});
export const addWord = (cardId: string) => ({
   type: ADD_WORD,
   payload: cardId,
});
export const deleteWord = (data: {
   cardId: string;
   words: ICard["words"];
}) => ({
   type: DELETE_WORD,
   payload: data,
});
// export const deleteWord = (ids: { cardId: string; wordId: string }) => ({
//    type: DELETE_WORD,
//    payload: ids,
// });
