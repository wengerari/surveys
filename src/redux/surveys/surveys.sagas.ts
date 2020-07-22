import { SagaIterator } from "redux-saga";
import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  ADD_SURVEY_START,
  DELETE_SURVEY_START,
  UPDATE_SURVEY_START,
  DeleteSurveyStart,
  UpdateSurveyStart,
  AddSurveyStart
} from "./surveys.types";
import {
  addObjectToCollection,
  deleteSurveyFromCollection,
  updateSurveyInCollection
} from "../../firebase/firebase.utils";
import {
  addSurveySuccess,
  addSurveyFailure,
  deleteSurveySuccess,
  updateSurveySuccess,
  updateSurveyFailure
} from "./surveys.actions";

export function* addSurvey(action: AddSurveyStart) {
  const {
    payload: { userId, title, dateStart, dateEnd, questions }
  } = action;
  try {
    let surveyId = null;
    if (userId)
      surveyId = yield call(addObjectToCollection, userId, {
        title,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        questions: questions
      });

    yield put(
      addSurveySuccess({
        id: surveyId ? surveyId : Math.random().toString(),
        title,
        dateStart,
        dateEnd,
        questions
      })
    );
  } catch (error) {
    yield put(addSurveyFailure(error.message));
  }
}

export function* deleteSurvey(action: DeleteSurveyStart): SagaIterator {
  const {
    payload: { surveyId, userId }
  } = action;
  try {
    if (userId) yield call(deleteSurveyFromCollection, surveyId, userId);
    yield put(deleteSurveySuccess(surveyId));
  } catch (error) {
    yield put(deleteSurveySuccess(error.message));
  }
}

export function* updateSurvey(action: UpdateSurveyStart): SagaIterator {
  const {
    payload: { userId, surveyToChange }
  } = action;
  try {
    if (userId) yield call(updateSurveyInCollection, userId, surveyToChange);
    yield put(updateSurveySuccess(surveyToChange));
  } catch (error) {
    yield put(updateSurveyFailure(error.message));
  }
}

export function* onAddSurveyStart(): SagaIterator {
  yield takeLatest(ADD_SURVEY_START, addSurvey);
}

export function* onDeleteSurveyStart(): SagaIterator {
  yield takeLatest(DELETE_SURVEY_START, deleteSurvey);
}

export function* onUpdateSurveyStart(): SagaIterator {
  yield takeLatest(UPDATE_SURVEY_START, updateSurvey);
}

export function* surveysSagas(): SagaIterator {
  yield all([
    call(onAddSurveyStart),
    call(onDeleteSurveyStart),
    call(onUpdateSurveyStart)
  ]);
}
