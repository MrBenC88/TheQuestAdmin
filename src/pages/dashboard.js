import Header from "../components/Header";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import UserPanel from "../components/UserPanel";
import DashboardHeader from "../components/DashboardHeader";
import { Box, Text } from "@chakra-ui/react";

// There are two modes in the dashboard:
// 1. Admin mode
// In the Admin mode, the user can create, edit, and delete quests. They can manage quests details, quest settings, and quest participants.

// 2. User mode
// This mode is for the end user on the receiving end of the quest. They can view the quest details, and complete the quest. The can browse quests and join quests via invitation code or public ones.
const Dashboard = () => {
  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <UserPanel />
    </Box>
  );
};

export default Dashboard;
