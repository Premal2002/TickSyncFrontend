import { Geist, Geist_Mono } from "next/font/google";
import LandingPage from "./LandingPage/index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
     <LandingPage /> 
    </>
  );
}
