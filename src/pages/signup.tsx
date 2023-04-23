import {
    GoogleAuthProvider,
    getAuth,
    getRedirectResult,
    signInWithRedirect,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import React from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import PopinBottom from "../components/PopinBottom";
  import { initFirebase } from "../components/firebase";
  import login_styles from "../styles/Login.module.css";
  import { collection, setDoc, addDoc, getDocs } from "firebase/firestore"; 
  import { getFirestore } from "firebase/firestore";
  import { users } from "../components/firebase";

  const LoginPage = () => {
    const app = initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const db = getFirestore(app);

    if (loading) {
      return <div></div>;
    }
    if (user) {
      /*const docRef = addDoc(collection(db, "username"), {
        username: user.email,
      });*/
      router.push("/");
    }
    const SignIn_G_Auth = async (e) => {
      e.preventDefault();
      const result = await signInWithRedirect(auth, provider);
      router.reload();
        const docRef = addDoc(collection(db, "username"), {
        username: user.email,
      });
      //console.log(result);
      //const userCred = await getRedirectResult(auth);
      //console.log(userCred);
    };
    const Create_Email = async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      //console.log(email, password);
        const result = createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
          const user = userCredential;
          //console.log(user);
          //console.log(user.user.email);
          const docRef = addDoc(collection(db, "username"), {
            username: user.user.email,
          });
        });          
      };
    return (
      <PopinBottom>
        <div className={login_styles.container}>
          <form className={login_styles.login_form}>
            <h1 className={login_styles.login_title}>Sign Up</h1>
            <div>
          <h2>
          <Link href="/login">
              Login Instead
          </Link>
          </h2>
          </div>
            <div>
              <label htmlFor="">Email:</label>
              <input type="email" id="email" />
              <label htmlFor="">Password:</label>
              <input type="password" id="password" />
              <button className={login_styles.login_button} onClick={Create_Email}>
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
  