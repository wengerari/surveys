import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { surveysReducer } from "./surveys/surveys.reducer";
import { userReducer } from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["surveys"]
};

export const rootReducer = combineReducers({
  user: userReducer,
  surveys: surveysReducer
});

//пока не знаю
export const persistedReducer: any = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
