import { FetchSurveysSuccess, Survey, FETCH_SURVEYS_SUCCESS, AddSurveyStart, ADD_SURVEY_START, AddSurveyStartPayload, AddSurveySuccessAction, AddSurveyFailureAction, ADD_SURVEY_SUCCESS, ADD_SURVEY_FAILURE, DeleteSurveyStart, DELETE_SURVEY_START, DeleteSurveySuccessAction, DELETE_SURVEY_SUCCESS, DeleteSurveyFailureAction, DELETE_SURVEY_FAILURE, DeleteSurveyStartPayload, UpdateSurveyStart, UpdateSurveyStartPayload, UPDATE_SURVEY_START, UpdateSurveySuccess, UPDATE_SURVEY_SUCCESS, UPDATE_SURVEY_FAILURE, UpdateSurveyFailure } from "./surveys.types";

export const addSurveyStart = (payload: AddSurveyStartPayload): AddSurveyStart => ({
  type: ADD_SURVEY_START,
  payload
});

export const addSurveySuccess = (payload: Survey): AddSurveySuccessAction => ({
  type: ADD_SURVEY_SUCCESS,
  payload
});

export const addSurveyFailure = (payload: string): AddSurveyFailureAction => ({
  type: ADD_SURVEY_FAILURE,
  payload
});



export const deleteSurveyStart = (payload: DeleteSurveyStartPayload): DeleteSurveyStart => ({
  type: DELETE_SURVEY_START,
  payload
});

export const deleteSurveySuccess = (payload: string): DeleteSurveySuccessAction => ({
  type: DELETE_SURVEY_SUCCESS,
  payload
});

export const deleteSurveyFailure = (payload: string): DeleteSurveyFailureAction => ({
  type: DELETE_SURVEY_FAILURE,
  payload
});






export const updateSurveyStart = (payload: UpdateSurveyStartPayload): UpdateSurveyStart => ({
  type: UPDATE_SURVEY_START,
  payload
});

export const updateSurveySuccess = (payload: Survey): UpdateSurveySuccess => ({
  type: UPDATE_SURVEY_SUCCESS,
  payload
});

export const updateSurveyFailure = (payload: string): UpdateSurveyFailure => ({
  type: UPDATE_SURVEY_FAILURE,
  payload
});





export const fetchSurveysSuccess = (payload: Survey[]): FetchSurveysSuccess => ({
  type: FETCH_SURVEYS_SUCCESS,
  payload
})
