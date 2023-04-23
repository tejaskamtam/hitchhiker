import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Inter } from "next/font/google";
import { useState } from "react";
import {plan_parse, loc_parse} from "./api/parse"
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

  const [prompts, setPrompts] = useState([]);

  async function onSubmit() {
    const user_prompt = document.getElementById("user-input").value.split(" ");
    document.getElementById("user-input").value = "";
    console.log(user_prompt);
    history = [...prompts];
    history.push({
      role: "user",
      content: `
      Plan a detailed trip. 
      Format: {Day: {Hour, Location}} json
      Preferences:
        start date: ${start_date}
        days: ${days}
        start location: ${start_location}
        end location: ${end_location}
        travelers: ${num_travelers}
        budget: ${budget}
        transportation: ${transportation}
        other tags: ${tags}
      `,
    });
    // get itinerary from OpenAI
    let response = await fetch("./api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mem: history }),
    });
    const res = await response.json();
    history.push(res.response);
    if (history) {
      setPrompts([...history]);
    }
    let itinerary = plan_parse(res.response.content);
    // get location from OpenAI
    response = await fetch("./api/locs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: res.response.content }),
    });
    const res2 = await response.json();
    let locations = loc_parse(res2.response.content);

    //setDoc(doc(db, "users", auth.uid), { prompts: history }, { merge: true });
    console.log(itinerary);
    console.log(locations);
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
      </div>
    </>
  );
}
