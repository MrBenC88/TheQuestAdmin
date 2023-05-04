import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <title>Life Admin</title>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
