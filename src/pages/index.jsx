import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Login from "../components/Login";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let history = [];
  //TODO: get prompts from firebase and update history
  const [prompts, setPrompts] = useState([]);
  // chat with AI
  async function onSubmit() {
    const user_prompt = document.getElementById("user-input").value;
    console.log(user_prompt);
    history = [...prompts];
    history.push({ role: "user", content: user_prompt });

    const response = await fetch("./api/openai", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: user_prompt.toString(), mem: history }),
    });
    // of return type - {response: {role:"", content:""}}
    const res = await response.json();
    history.push(res.response);

    if (history) {
      setPrompts([...history]);
    }
    //setDoc(doc(db, "users", auth.uid), { prompts: history }, { merge: true });

    console.log(prompts);
  }

  return (
    <div className="container">
      <div className="grid place-content-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl my-8">HITCH HIKE YOUR TRIP PLANNING</h1>
        </div>
      </div>
      <input type="text" id="user-input" />
      <button id="submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
