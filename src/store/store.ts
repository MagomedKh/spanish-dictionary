import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
   devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
