import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar/NavBar'
import { poppins } from "../utils/fonts";
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className={poppins.className}>
        <div className="flex flex-col h-screen">
          <Component {...pageProps} className="flex-grow"/>
          <NavBar />
        </div>
        
      </div>
    </ChakraProvider>
    
  )
}
