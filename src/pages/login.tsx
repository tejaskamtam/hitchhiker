import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
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
  const SignIn_G_Auth = async (e) => {
    //console.log(auth, provider);
    e.preventDefault();
    const result = await signInWithRedirect(auth, provider);
    //console.log(result);
    //const userCred = await getRedirectResult(auth);
    //console.log(userCred);
  };
  const SignIn_Email = async (e) => {
    e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
    const result = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in 
      const user = userCredential.user;
    });
    };
  return (
    <PopinBottom>
      <div className={login_styles.container}>
        <form className={login_styles.login_form}>
          <h1 className={login_styles.login_title}>Login</h1>
          <div>
          <h2>
          <Link href="/signup">
              Signup
          </Link>
          </h2>
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <input type="email" id="email" />
            <label htmlFor="">Password:</label>
            <input type="password" id="password" />
            <button className={login_styles.login_button} onClick={SignIn_Email}>
              Submit
            </button>
          </div>
          - or -
          <button className={login_styles.google_oauth} onClick={SignIn_G_Auth}>
            <img src="google.png" alt="google" />
            <p>Login in with Google</p>
          </button>
        </form>
      </div>
    </PopinBottom>
  );
  
};

export default LoginPage;
