import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PopinBottom from "../components/PopinBottom";
import { initFirebase } from "../components/firebase";
import login_styles from "../styles/Login.module.css";

const LoginPage = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return <div></div>;
  }
  if (user) {
    router.push("/");
  }
  const SignIn = async () => {
    //console.log(auth, provider);
    const result = await signInWithRedirect(auth, provider);
    //console.log(result);
    //const userCred = await getRedirectResult(auth);
    //console.log(userCred);
  };
  return (
    <PopinBottom>
      <div className={login_styles.container}>
        <form className={login_styles.login_form}>
          <h1 className={login_styles.login_title}>Login or Sign Up</h1>
          <div>
            <label htmlFor="">Email:</label>
            <input type="email" id="email" />
            <label htmlFor="">Password:</label>
            <input type="password" id="password" />
            <button className={login_styles.login_button} onClick={SignIn}>
              Submit
            </button>
          </div>
          - or -
          <button className={login_styles.google_oauth} onClick={SignIn}>
            <img src="google.png" alt="google" />
            <p>Login in with Google</p>
          </button>
        </form>
      </div>
    </PopinBottom>
  );
};

export default LoginPage;
