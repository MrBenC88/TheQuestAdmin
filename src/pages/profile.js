import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";

import { Box, Text } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <Box boxSize="80%" align="center">
        <Text fontSize="3xl" fontWeight="bold" mt="10" textColor="black">
          Hi maggie
        </Text>
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;
