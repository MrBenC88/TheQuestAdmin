import Header from "../components/Header";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import BrowseQuest from "../components/BrowseQuest";
import DashboardHeader from "../components/DashboardHeader";
import { Box, Text } from "@chakra-ui/react";

// Browse page is for listing all the available quests for the user to join.
// The user can accept any global public quest.
// The user can accept any private quest that they have been invited to via invitation code as well

const Browse = () => {
  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <BrowseQuest />
    </Box>
  );
};

export default Browse;
