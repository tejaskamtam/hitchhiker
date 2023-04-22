import styles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Inter } from "next/font/google";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let history = [];
  //TODO: get prompts from firebase and update history
  const [prompts, setPrompts] = useState([]);
  // chat with AI
  async function onSubmit() {
    const user_prompt = document.getElementById("user-input").value;
    document.getElementById("user-input").value = "";
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
    <>
      <div class="container">
        {/* test OpenAI api */}
        <input type="text" id="user-input" />
        <button id="submit-button" onClick={onSubmit}>
          Submit
        </button>
        {/* test MUI login */}

          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              id="component-outlined"
              defaultValue="Composed TextField"
              label="Name"
            />
          </FormControl>
      </div>
    </>
  );
}
