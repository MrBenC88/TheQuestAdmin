import { useRouter } from "next/router";

import DashboardHeader from "../../../components/DashboardHeader";
import { Box, Text } from "@chakra-ui/react";

const QuestPage = () => {
  const router = useRouter();
  const { questId } = router.query;

  // fetch the data for the quest with the given quest_id here...

  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <Box bgColor="aqua" p="4%">
        <Text textColor="black">Quest {questId}</Text>
      </Box>

      {/* render the quest details here... */}
    </Box>
  );
};

export default QuestPage;
