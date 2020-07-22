export type User = {
  id: string;
};


export type EmailSignInData = {
  email: string;
  password: string;
}


export type SignUpData = {
  name: string;
  email: string;
  password: string;
}



export const GOOGLE_SIGN_IN_START = "GOOGLE_SIGN_IN_START";
type GoogleSignInStart = {
  type: typeof GOOGLE_SIGN_IN_START;
};

export const GOOGLE_SIGN_IN_SUCCESS = "GOOGLE_SIGN_IN_SUCCESS";
export type GoogleSignInSuccess = {
  type: typeof GOOGLE_SIGN_IN_SUCCESS;
  payload: User;
};

export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export type SignInFailure = {
  type: typeof SIGN_IN_FAILURE;
  payload: string;
};

export const SIGN_OUT_START = "SIGN_OUT_START";
type SignOutStart = {
  type: typeof SIGN_OUT_START;
};

export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
type SignOutSuccess = {
  type: typeof SIGN_OUT_SUCCESS;
};

export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";
export type SignOutFailure = {
  type: typeof SIGN_OUT_FAILURE;
  payload: string;
};

export const CHECK_USER_SESSION = "CHECK_USER_SESSION";
type CheckUserSession = {
  type: typeof CHECK_USER_SESSION;
};

export const EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START";
export type EmailSignInStart = {
  type: typeof EMAIL_SIGN_IN_START;
  payload: EmailSignInData;
};

export const SIGN_UP_START ="SIGN_UP_START";
export type SignUpStart = {
  type: typeof SIGN_UP_START;
  payload: SignUpData;
}






export type UserActionTypes =
  | GoogleSignInStart
  | GoogleSignInSuccess
  | SignInFailure
  | SignOutStart
  | SignOutSuccess
  | SignOutFailure
  | CheckUserSession
  | EmailSignInStart
  | SignUpStart;
