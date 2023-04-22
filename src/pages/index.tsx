import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Login from "../components/Login";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
