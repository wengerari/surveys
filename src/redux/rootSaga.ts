import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { surveysSagas } from "./surveys/surveys.sagas";

export function* rootSaga(): Generator {
  yield all([call(userSagas), call(surveysSagas)]);
}
