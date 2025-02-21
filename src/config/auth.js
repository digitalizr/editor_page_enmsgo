import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { clearAuth } from "../redux/features/authSlice.js";
import Cookies from "js-cookie";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmail = async (email) => {
  const actionCodeSettings = {
    // url: "http://localhost:5173/",
    url: window.location.origin,
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = (dispatch) => {
  return auth
    .signOut()
    .then(() => {
      // Clear authentication state in Redux
      dispatch(clearAuth());

      // Remove any authentication-related cookies
      Cookies.remove("user");
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
