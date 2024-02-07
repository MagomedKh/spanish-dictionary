import { all, fork } from "redux-saga/effects";
import { createCardWatcher } from "./cardsSaga";

export default function* rootSaga() {
   yield all([createCardWatcher()]);
}
