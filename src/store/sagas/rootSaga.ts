import { all, fork } from "redux-saga/effects";
import { watchDictionaries } from "./dictionariesSaga";
import { watchWords } from "./wordsSaga";

export default function* rootSaga() {
   yield all([fork(watchDictionaries), fork(watchWords)]);
}
