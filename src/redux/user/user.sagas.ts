import { SagaIterator } from "redux-saga";
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  GOOGLE_SIGN_IN_START,
  SIGN_OUT_START,
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  EmailSignInData,
  SIGN_UP_START,
  EmailSignInStart
} from "./user.types";
import {
  getCurrentUser,
  auth,
  googleProvider,
  createUserProfileDocument,
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  googleSignInSuccess,
  signInFailure,
  signOutSucces,
  signOutFailure
} from "./user.actions";
import { fetchSurveysSuccess } from "../surveys/surveys.actions";

import {SignUpStart} from "./user.types";





export function* getSnapshotFromUserAuth(
  userAuth: unknown,
  ...additionalData: any
) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();

    const collectionRef =  firestore.collection("users").doc(userSnapshot.id).collection("surveys");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot,
    );
    yield put(fetchSurveysSuccess(collectionsMap));

    yield put(googleSignInSuccess({ id: userSnapshot.id }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}




export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signOut(): Generator {
  try {
    yield auth.signOut();
    yield put(signOutSucces());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

export function* isUserAuthenticated(): Generator {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail(action: EmailSignInStart) {
  const { payload: { email, password } } = action;
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signUp(action: SignUpStart) {
  const { payload: { name, email, password } } = action;
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(googleSignInSuccess({ id: user.uid }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}






export function* onGoogleSignInStart(): SagaIterator {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignOutStart(): SagaIterator {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* onCheckUserSession(): SagaIterator {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart(): SagaIterator {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart(): SagaIterator {
  yield takeLatest(SIGN_UP_START, signUp);
}

export function* userSagas(): SagaIterator {
  yield all([
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onSignUpStart)
  ]);
}
