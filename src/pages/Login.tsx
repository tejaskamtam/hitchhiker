import React from 'react';
import login_styles from '../styles/Login.module.css';
import { initFirebase } from '../components/firebase';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PopinBottom from '../components/PopinBottom';

const LoginPage = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    router.push('/');
    return <div>Let's plan a trip {user.displayName}</div>;
  }
  const SignIn = async () => {
    const result = await signInWithRedirect(auth, provider);
  };
  return (
    <PopinBottom
    >
      <div className={login_styles.container}>
        <form className={login_styles.login_form}>
          <h1 className={login_styles.login_title}>Login</h1>
          <div>
            <label htmlFor="">Email:</label>
            <input type="email" id="email" />
            <label htmlFor="">Password:</label>
            <input type="password" id="password" />
          </div>
          <button className={login_styles.login_button} onClick={SignIn}>
            Login In
          </button>
          <button className={login_styles.google_oauth} onClick={SignIn}>
            <img src="google.png" alt="google" />
            <p>Login in with Google</p>
          </button>
          <p className={login_styles.sign_up_text}>
            don't have an account? <Link href="/signup">sign up</Link>
          </p>
        </form>
      </div>
    </PopinBottom>
  );
};

export default LoginPage;
