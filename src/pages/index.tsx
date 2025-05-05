import { Geist, Geist_Mono } from "next/font/google";
import LandingPage from "../components/LandingPage/index";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
