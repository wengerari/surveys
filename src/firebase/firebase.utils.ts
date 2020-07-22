import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Survey } from "../redux/surveys/surveys.types";
import { Answer } from "../components/surveyPassingMain/surveyPassingMain.component";

const config = {
  apiKey: "AIzaSyDxt4t-iXfRIhKEhrkQMWkLLBJvYQH9KRQ",
  authDomain: "surveys-8150c.firebaseapp.com",
  databaseURL: "https://surveys-8150c.firebaseio.com",
  projectId: "surveys-8150c",
  storageBucket: "surveys-8150c.appspot.com",
  messagingSenderId: "611134234575",
  appId: "1:611134234575:web:11b5e2d41f834243617cba",
  measurementId: "G-1CLQ9VW3VK"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth: any, additionalData: any) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};



export const addObjectToCollection = async (userId: string, obj: any) => {
  return firestore.collection("users").doc(userId).collection("surveys").add(obj).then(docRef => docRef.id);
};



export const addAnswerToCollection = async (surveyId: string, userId: string, obj: Answer[]) => {
  firestore.collection("users").doc(userId).collection("answers").doc(surveyId).set({[new Date().toDateString()]: obj});
};




export const convertCollectionsSnapshotToMap = (collections: any) => {
  return collections.docs.map((doc: any) => {
    const { title, dateEnd, dateStart, questions } = doc.data();

    return {
      id: doc.id,
      title,
      dateStart: dateStart.toDate(),
      dateEnd: dateEnd.toDate(),
      questions
    };
  });

};


export const deleteSurveyFromCollection = (surveyId: string, userId: string) => {
  firestore.collection("users").doc(userId).collection("surveys").doc(surveyId).delete()
}


export const updateSurveyInCollection = (userId: string, survey: Survey) => {
  const {id, title, dateStart, dateEnd, questions} = survey
  firestore.collection("users").doc(userId).collection("surveys").doc(id).set({
    title,
    dateStart,
    dateEnd,
    questions
  })
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};









export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signWithGoogle = () => auth.signInWithPopup(googleProvider);
