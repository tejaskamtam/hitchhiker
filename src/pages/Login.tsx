import React from "react";
import "../styles/Login.module.css";
import Login_module from "../styles/Login.module.css";
import { initFirebase } from "../components/firebase";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";

const LoginPage = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter() ;
  if(loading){
    return <div>Loading...</div>;
  }
  if(user){
    router.push("/");
    return <div>Let's plan a trip {user.displayName}</div>
  }
  const SignIn = async() => {
    const result = await signInWithRedirect(auth, provider);
  };
  return(
    <div className="text-center flex flex-col gap-4 items-center">
      <div>
        Please Log In or Sign Up
      </div>
      <button onClick={SignIn}>
        <div className="bg-blue-600 text-white rounded-md p-2 w-48"> Sign In</div>
      </button>
    </div>
  ); 
}

export default LoginPage;