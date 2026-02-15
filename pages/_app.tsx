import { AuthProvider } from "@/services/AuthContext";
import type { AppProps } from "next/app";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
