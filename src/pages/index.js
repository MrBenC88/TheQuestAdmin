import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import CTABanner from "../components/CTABanner";
import HeroHeader from "../components/HeroHeader";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import AuthComponent from "../components/AuthComponent";
import clientPromise from "../../lib/mongodb";

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({ isConnected }) {
  return (
    <Box boxSize="100%">
      <AuthComponent />
      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}
      <CTABanner />
      <Header />
      <HeroHeader />
      <HomeContent />
      <Footer />
    </Box>
  );
}
