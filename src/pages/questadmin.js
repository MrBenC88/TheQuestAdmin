import Header from "../components/Header";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import QuestAdminToolbox from "../components/QuestAdminToolbox";

import { Box, Text } from "@chakra-ui/react";
const QuestAdmin = () => {
  return (
    <Box boxSize="100%" bgColor="orange.50">
      {/* <CTABanner /> */}
      <DashboardHeader />
      <QuestAdminToolbox />
      <Footer />
    </Box>
  );
};

export default QuestAdmin;
