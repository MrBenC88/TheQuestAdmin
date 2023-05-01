{
  /* render the quest details here... */
}
{
  /* A quest consists of a list of tasks */
}
{
  /* Structure:
      - Show Quest Bundle Details First also show count down, and all details. Daily Quests are tasks that must have all the tasks submitted and completed by timelimit
      - Show give up button and submit entire quest button
      - Show Rewards and Punishments for the Quest 
      - Show Quest List of Tasks
      - Each Task will open a modal with the task details and allow the user to submit the task. It will take full screen and have a close button.
        - The modal will have a button to submit the task. The button will be disabled until the user has completed the task.
      */
}
{
  /* create different components for each quest type: daily, weekly, yearly, one off
      Also ensure to account for different submission types, etc.  */
}

import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DashboardHeader from "../../../components/DashboardHeader";
import CountdownTimer from "../../../components/CountdownTimer";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { sampleQuests } from "../../../constants/questData";

const getQuestById = (quests, questId) => {
  return quests.find((quest) => quest.questId === questId);
};

const QuestPage = () => {
  const router = useRouter();
  const { questId } = router.query;
  const [remainingTime, setRemainingTime] = useState(
    moment.tz("America/Los_Angeles").endOf("day").diff(moment(), "seconds")
  );

  const handleFinalSubmission = () => {
    // Submit final quest submission
  };

  useEffect(() => {
    // set interval to update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      // if remaining time reaches 0, reset to the number of seconds until midnight PST
      setRemainingTime(
        moment.tz("America/Los_Angeles").endOf("day").diff(moment(), "seconds")
      );
    }
  }, [remainingTime]);

  // fetch the data for the quest with the given quest_id here...
  console.log(sampleQuests, questId);
  let quest = getQuestById(sampleQuests, questId);

  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />
      <Box bgColor="aqua" p="4%">
        <Text textColor="black">Quest {questId}</Text>
      </Box>
      <Box bgColor="green" p="4%">
        {quest && (
          <>
            <Text textColor="black">{quest.questName}</Text>
            <Text textColor="black">{quest.questDescription}</Text>
          </>
        )}
        <CountdownTimer remainingTime={remainingTime} />
        <Stack spacing="4">
          {quest &&
            quest.questTasks.map((task) => (
              <Text key={task.taskName}>{task.taskName}</Text>
            ))}
        </Stack>

        <Button onClick={handleFinalSubmission}>Submit Quest</Button>
      </Box>
    </Box>
  );
};

export default QuestPage;
