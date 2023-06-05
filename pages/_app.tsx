import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar/NavBar'
import { poppins } from "../utils/fonts";
import { ChakraProvider, Theme, extendTheme } from '@chakra-ui/react';

const config = {
    fonts: {
      heading: poppins.style.fontFamily,
      body: poppins.style.fontFamily,
      mono: poppins.style.fontFamily
    }
} 

const theme = extendTheme( config )

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div className={poppins.className}>
        <div className="flex flex-col h-screen">
          <Component {...pageProps} className="flex-grow"/>
          <NavBar />
        </div>
        
      </div>
    </ChakraProvider>
    
  )
}
