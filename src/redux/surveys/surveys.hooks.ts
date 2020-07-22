import { useSelector } from "react-redux";
import { AppState } from "../rootReducer";
import { Survey } from "./surveys.types";

export const SelectSurveys = () => {
  return useSelector<AppState, Survey[]>((state) => state.surveys);
};
