import '@/styles/globals.css'
import "text-encoding";
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar/NavBar'
import { poppins } from "../utils/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
      <NavBar />
    </div>
    
  )
}
