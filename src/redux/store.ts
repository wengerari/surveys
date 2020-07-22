import { createStore, applyMiddleware, Middleware } from "redux";

import logger from "redux-logger";

import createSagaMiddleware from "redux-saga";

import { persistStore } from "redux-persist";
import { persistedReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
