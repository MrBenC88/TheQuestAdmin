import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <title>Tech Career Change</title>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
