import styles from "@/styles/Home.module.css";
import { getAuth } from "firebase/auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import PopinBottom from "../components/PopinBottom";
import PopinLeft from "../components/PopinLeft";
import Trip from "../components/trip";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  console.log(user);

  if (loading) return <div></div>;

  return (
    <>
      {!user ? (
        <PopinLeft styles={styles.container}>
          <div className={styles.landing_container}>
            <h1>Hitch Hike</h1>
            <h2>on our epic journeys</h2>
            <Link href="/Login">Get Started</Link>
          </div>
        </PopinLeft>
      ) : (
        <PopinBottom>
          <div className={styles.dashboard}>
            <h1>My Trips</h1>
            <div className={styles.dashboard_trips}>
              <div className={styles.dashboard_trip}>
                <div className={styles.trip_image_container}>
                  <img src="add_trip.png" alt="add trip" />
                </div>
                <p>New Trip</p>
                <p>4/22/2023</p>
              </div>
              <Trip name="trip 1" image="background.png" date="4/22/2023" />
            </div>
          </div>
        </PopinBottom>
      )}
    </>
  );
}
