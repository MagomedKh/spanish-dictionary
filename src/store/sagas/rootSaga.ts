import { all, fork } from "redux-saga/effects";
import { watchCards } from "./cardsSaga";
import { watchWords } from "./wordsSaga";

export default function* rootSaga() {
   yield all([fork(watchCards), fork(watchWords)]);
}
