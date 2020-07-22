import { User, UserActionTypes, GOOGLE_SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from "./user.types";

export type UserState = {
  currentUser: User | null;
  error: string | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action: UserActionTypes): UserState => {
  switch(action.type){
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }
    case SIGN_OUT_SUCCESS:
      return{
        ...state,
        currentUser: null,
        error: null
      }
    case SIGN_OUT_FAILURE:
    case SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default: 
    return state;
  }
  return state;
}
