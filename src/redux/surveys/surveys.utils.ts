import { Survey } from "./surveys.types"

export const deleteItemFn = (state: Survey[], payload: string): Survey[] => state.filter(item => item.id !== payload);

export const updateSurveyFn = (state: Survey[], payload: Survey): Survey[] => {
  const copedSurveys = [...state];
  copedSurveys[state.findIndex(item => item.id === payload.id)] = payload;
  return copedSurveys;
}