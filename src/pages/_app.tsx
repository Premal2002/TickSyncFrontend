import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/HelperFunctions/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <AuthProvider>
    <Navbar></Navbar>
    <Component {...pageProps} />
    <Footer></Footer>
    </AuthProvider>
    </>
  )
}
