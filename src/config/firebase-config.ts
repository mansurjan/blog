import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDTPH3jM1FY4ODn7vbIiSdnzK6YQjtuUl4",
  authDomain: "react-auth-73449.firebaseapp.com",
  projectId: "react-auth-73449",
  storageBucket: "react-auth-73449.appspot.com",
  messagingSenderId: "309294667989",
  appId: "1:309294667989:web:ad92b9bb8ca2657926ea5c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
