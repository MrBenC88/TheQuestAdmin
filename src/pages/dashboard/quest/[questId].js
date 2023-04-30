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
      {/* A quest consists of a list of tasks */}
      {/* Structure:
      - Show Quest Bundle Details First also show count down, and all details. Daily Quests are tasks that must have all the tasks submitted and completed by timelimit
      - Show give up button and submit entire quest button
      - Show Rewards and Punishments for the Quest 
      - Show Quest List of Tasks
      - Each Task will open a modal with the task details and allow the user to submit the task. It will take full screen and have a close button.
        - The modal will have a button to submit the task. The button will be disabled until the user has completed the task.
       

      
      */}
      {/* create different components for each quest type: daily, weekly, yearly, one off
      Also ensure to account for different submission types, etc.  */}
    </Box>
  );
};

export default QuestPage;
