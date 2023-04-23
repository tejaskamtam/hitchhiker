import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "../components/firebase";
import { geoposition } from "./api/geo";
import { make_trip } from "./api/openai";
import { loc_parse, plan_parse } from "./api/parse";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //TODO: fetch certain prefrences and history from Firebase
  let history = [];
  let tags = "";
  let num_travelers = "4";
  let start_date = "1/10/2030";
  let days = "5";
  let start_location = "Rome, Italy";
  let end_location = "Paris, France";
  let budget = "luxury";
  let transportation = "any";
  const app = initFirebase();
  const db = getFirestore(app);

  const [prompts, setPrompts] = useState([]);
  const [user, loading] = useAuthState(getAuth());

  // async function onSubmit() {
  //   const user_prompt = document.getElementById("user-input").value.split(" ");
  //   document.getElementById("user-input").value = "";
  //   console.log(user_prompt);
  //   history = [...prompts];
  //   history.push({
  //     role: "user",
  //     content: `
  //     Plan a detailed trip.
  //     Format: {Day: {Hour, Location}} json
  //     Preferences:
  //       start date: ${start_date}
  //       days: ${days}
  //       start location: ${start_location}
  //       end location: ${end_location}
  //       travelers: ${num_travelers}
  //       budget: ${budget}
  //       transportation: ${transportation}
  //       other tags: ${tags}
  //     `,
  //   });
  //   // get itinerary from OpenAI
  //   let response = await fetch("./api/plan", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ mem: history }),
  //   });
  //   const res = await response.json();
  //   history.push(res.response);
  //   if (history) {
  //     setPrompts([...history]);
  //   }
  //   let itinerary = plan_parse(res.response.content);
  //   // get location from OpenAI
  //   response = await fetch("./api/locs", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ plan: res.response.content }),
  //   });
  //   const res2 = await response.json();
  //   let locations = loc_parse(res2.response.content);
  //   console.log(itinerary);

  //   const doc_id = addDoc(collection(db, "trips"), {
  //     user: user.email,
  //     trip: itinerary,
  //     locations: locations,
  //   });
  //   console.log(locations);
  // }

  // test geo api

  async function onSubmit() {
    let history = [];
    let start_date = "1/10/2030";
    let days = "5";
    let start_location = "Rome, Italy";
    let end_location = "Paris, France";
    let budget = "luxury";
    let transportation = "any";
    let tags = "";
    let num_travelers = "4";
    make_trip(
      history,
      start_date,
      days,
      start_location,
      end_location,
      budget,
      transportation,
      tags,
      num_travelers
    );
  }

  async function test_geo() {
    const response = await geoposition("Rome, Italy");
    console.log(response);
  }

  return (
    <>
      <div class="container">
        {/* test OpenAI api */}
        <p>Enter in format: "DAYS" "LOCATION"</p>
        <input type="text" id="user-input" />
        <button id="submit-button" onClick={onSubmit}>
          Submit
        </button>
        <button id="submit-button" onClick={test_geo}>
          Test GEO
        </button>
      </div>
    </>
  );
}
