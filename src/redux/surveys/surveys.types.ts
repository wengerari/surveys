export type Question = {
  id: number;
  title: string;
  type: "text" | "multilineText" | "number" | "date" | "choice" | "scale";
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  dateFormat?: "onlyDate" | "dateAndTime";
  choiceValues?: string[];
  scaleStartValue?: number;
  scaleEndValue?: number;
};

export type Survey = {
  id: string;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  questions: Question[];
};



export type AddSurveyStartPayload = {
  userId: string | null;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  questions: Question[]
}



export type DeleteSurveyStartPayload = {
  userId: string | null;
  surveyId: string;
}

export type UpdateSurveyStartPayload = {
  userId: string | null;
  surveyToChange: Survey;
}



export const ADD_SURVEY_START = "ADD_SURVEY_START";
export type AddSurveyStart = {
  type: typeof ADD_SURVEY_START;
  payload: AddSurveyStartPayload;
};

export const ADD_SURVEY_SUCCESS = "ADD_SURVEY_SUCCESS";
export type AddSurveySuccessAction = {
  type: typeof ADD_SURVEY_SUCCESS;
  payload: Survey;
};

export const ADD_SURVEY_FAILURE = "ADD_SURVEY_FAILURE";
export type AddSurveyFailureAction = {
  type: typeof ADD_SURVEY_FAILURE;
  payload: string;
};





export const DELETE_SURVEY_START = "DELETE_SURVEY_START";
export type DeleteSurveyStart = {
  type: typeof DELETE_SURVEY_START;
  payload: DeleteSurveyStartPayload
}

export const DELETE_SURVEY_SUCCESS = "DELETE_SURVEY_SUCCESS";
export type DeleteSurveySuccessAction = {
  type: typeof DELETE_SURVEY_SUCCESS;
  payload: string
}

export const DELETE_SURVEY_FAILURE = "DELETE_SURVEY_FAILURE";
export type DeleteSurveyFailureAction = {
  type: typeof DELETE_SURVEY_FAILURE;
  payload: string
}






export const UPDATE_SURVEY_START = "UPDATE_SURVEY_START";
export type UpdateSurveyStart = {
  type: typeof UPDATE_SURVEY_START;
  payload: UpdateSurveyStartPayload
}

export const UPDATE_SURVEY_SUCCESS = "UPDATE_SURVEY_SUCCESS";
export type UpdateSurveySuccess = {
  type: typeof UPDATE_SURVEY_SUCCESS;
  payload: Survey
}

export const UPDATE_SURVEY_FAILURE = "UPDATE_SURVEY_FAILURE";
export type UpdateSurveyFailure = {
  type: typeof UPDATE_SURVEY_FAILURE;
  payload: string
}






export const FETCH_SURVEYS_SUCCESS = "FETCH_SURVEYS_SUCCESS";
export type FetchSurveysSuccess = {
  type: typeof FETCH_SURVEYS_SUCCESS;
  payload: Survey[]
};




export type SurveysActionTypes = UpdateSurveyStart | UpdateSurveySuccess | UpdateSurveyFailure | DeleteSurveyStart | DeleteSurveySuccessAction | DeleteSurveyFailureAction | FetchSurveysSuccess | AddSurveyStart | AddSurveySuccessAction | AddSurveyFailureAction;
