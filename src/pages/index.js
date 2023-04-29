import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import CTABanner from "../components/CTABanner";
import HeroHeader from "../components/HeroHeader";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Box boxSize="100%">
      <CTABanner />
      <Header />
      <HeroHeader />
      <HomeContent />
      <Footer />
    </Box>
  );
}