import {
  UserActionTypes,
  GOOGLE_SIGN_IN_START,
  User,
  GOOGLE_SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  GoogleSignInSuccess,
  SignInFailure,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SignOutFailure,
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  EmailSignInData,
  EmailSignInStart,
  SignUpData,
  SignUpStart,
  SIGN_UP_START
} from "./user.types";

export const googleSignInStart = (): UserActionTypes => ({
  type: GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (payload: User): GoogleSignInSuccess => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  payload
});

export const signInFailure = (payload: string): SignInFailure => ({
  type: SIGN_IN_FAILURE,
  payload
});

export const signOutStart = (): UserActionTypes => ({
  type: SIGN_OUT_START
});

export const signOutSucces = (): UserActionTypes => ({
  type: SIGN_OUT_SUCCESS
});

export const signOutFailure = (payload: string): SignOutFailure => ({
  type: SIGN_OUT_FAILURE,
  payload
});

export const checkUserSession = (): UserActionTypes => ({
  type: CHECK_USER_SESSION
});


export const emailSignInStart = (payload: EmailSignInData): EmailSignInStart => ({
  type: EMAIL_SIGN_IN_START,
  payload
});

export const signUpStart = (payload: SignUpData): SignUpStart => ({
  type: SIGN_UP_START,
  payload
});
