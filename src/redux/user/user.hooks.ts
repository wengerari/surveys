import { useSelector } from "react-redux";
import { AppState } from "../rootReducer";
import { UserState } from "./user.reducer";

export const SelectUser = () => {
  return useSelector<AppState, UserState>((state) => state.user);
};
