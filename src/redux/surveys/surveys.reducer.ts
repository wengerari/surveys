import {
  Survey,
  SurveysActionTypes,
  FETCH_SURVEYS_SUCCESS,
  ADD_SURVEY_SUCCESS,
  DELETE_SURVEY_SUCCESS,
  UPDATE_SURVEY_SUCCESS
} from "./surveys.types";
import { deleteItemFn, updateSurveyFn } from "./surveys.utils";

const INITIAL_STATE: Survey[] = [];

export const surveysReducer = (
  state = INITIAL_STATE,
  action: SurveysActionTypes
): Survey[] => {
  switch (action.type) {
    case ADD_SURVEY_SUCCESS:
      return [...state, action.payload];
    case DELETE_SURVEY_SUCCESS:
      return deleteItemFn(state, action.payload);
    case UPDATE_SURVEY_SUCCESS:
      return updateSurveyFn(state, action.payload);
    case FETCH_SURVEYS_SUCCESS:
      return action.payload;
  }
  return state;
};
