import {
   combineReducers,
   configureStore,
   ReducersMapObject,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { cardsSlice } from "./slices/CollectionsSlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ cards: cardsSlice.reducer });

export const store = configureStore({
   reducer: rootReducer,
   devTools: true,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
