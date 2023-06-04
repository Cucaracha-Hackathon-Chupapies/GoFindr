import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar/NavBar'
import { poppins } from "../utils/fonts";
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className={poppins.className}>
        <Component {...pageProps} />
        <NavBar />
      </div>
    </ChakraProvider>
    
  )
}
