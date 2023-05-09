/* render the quest details here... */

/* A quest consists of a list of tasks */

/* Structure:
      - Show Quest Bundle Details First also show count down, and all details. Daily Quests are tasks that must have all the tasks submitted and completed by timelimit
      - Show give up button and submit entire quest button
      - Show Rewards and Punishments for the Quest 
      - Show Quest List of Tasks
      - Each Task will open a modal with the task details and allow the user to submit the task. It will take full screen and have a close button.
        - The modal will have a button to submit the task. The button will be disabled until the user has completed the task.
      */

// TODO: Create separate components for each quest type!
/* create different components for each quest type: daily, weekly, yearly, one off
      Also ensure to account for different submission types, etc.  */

import Link from "next/link";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DashboardHeader from "../../../components/DashboardHeader";
import CountdownTimer from "../../../components/CountdownTimer";
import Task from "../../../components/Task";
import {
  Box,
  Button,
  Stack,
  Text,
  useMediaQuery,
  HStack,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { sampleQuests } from "../../../constants/questData";

const getQuestById = (quests, questId) => {
  return quests.find((quest) => quest.questId === questId);
};

const QuestPage = () => {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [isQuestCompleted, setIsQuestCompleted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [expandedRewards, setExpandedRewards] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { questId } = router.query;
  const [remainingTime, setRemainingTime] = useState(
    moment.tz("America/Los_Angeles").endOf("day").diff(moment(), "seconds")
  );
  let quest = getQuestById(sampleQuests, questId);

  const handleFinalSubmission = () => {
    if (isQuestCompleted) {
      // give user point for completing the quest
      alert("quest completed");
    } else {
      // show error message or do something else
      alert("quest failed");
    }
  };

  const handleExpandRewards = () => {
    setExpandedRewards(!expandedRewards);
  };

  useEffect(() => {
    const endDate = new Date().getTime() + remainingTime * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countdownString = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

      setCountdown(countdownString);
    };

    updateCountdown(); // Update the countdown immediately upon mounting
    const interval = setInterval(updateCountdown, 1000); // Update the countdown every second

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleTaskSubmit = () => {
    setIsModalOpen(false);
    setIsTaskComplete(true);
    setCompletedTasks((prevCompletedTasks) => prevCompletedTasks + 1);
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

  useEffect(() => {
    if (completedTasks === quest?.questTasks?.length) {
      setIsQuestCompleted(true);
    }
  }, [completedTasks, quest]);

  // fetch the data for the quest with the given quest_id here...
  //   console.log(sampleQuests, questId);

  const backgroundImageStyle = quest?.questImage
    ? {
        backgroundImage: `url(${quest?.questImage})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
        opacity: 0.15,
      }
    : {};

  const questStatus = (
    <Box
      position="absolute"
      top={isMobile ? "7%" : "auto"}
      bottom={isMobile ? "auto" : "45%"}
      right={isMobile ? "3%" : 0}
    >
      <Text
        color="black"
        fontSize={isMobile ? "md" : "2xl"}
        transform={isMobile ? "rotate(0deg)" : "rotate(90deg)"}
      >
        {quest?.questStatus?.toUpperCase()}
      </Text>
    </Box>
  );

  const questDetails = (
    <VStack align="left">
      <Box
        style={backgroundImageStyle}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
      />
      {isMobile ? (
        <>
          <HStack>
            <Heading color="black" size="lg">
              {quest?.questName}
            </Heading>
          </HStack>
          <Text
            color="black"
            fontSize="xl"
            position="absolute"
            right="-1%"
            top="45%"
            transform={"rotate(90deg)"}
          >
            {quest?.questType?.toUpperCase()}
          </Text>
        </>
      ) : (
        <HStack>
          <Heading color="black" size="lg">
            {quest?.questName}
          </Heading>
          <Text color="black" fontSize="xl">
            {quest?.questType?.toUpperCase()}
          </Text>
        </HStack>
      )}

      <Text color="black" fontSize="sm" flexWrap w="95%">
        {quest?.questDescription}
        <br />
        Created by {quest?.questCreator}
        <br />
        {quest?.questMembers?.length} members | {quest?.questTasks?.length}{" "}
        tasks
      </Text>
    </VStack>
  );

  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />

      {quest ? (
        <Box
          bgColor="white"
          py="0.5%"
          px={isMobile ? "3%" : "5%"}
          width="100%"
          color="black"
        >
          <Heading color="black" size="lg">
            {quest.questType.toUpperCase()} | Quest ID: {questId}
          </Heading>
          <Box
            key={quest.questName}
            bgColor="gray.100"
            py={"2%"}
            px="5%"
            width="100%"
            textColor="black"
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="lg"
            my="1%"
            position="relative"
          >
            <>
              {quest.questName}
              {questDetails}
              {questStatus}
            </>
          </Box>
          <Box
            bgColor="gray.100"
            justify="center"
            align="center"
            boxSize="100%"
          >
            <CountdownTimer
              remainingTime={remainingTime}
              countdown={countdown}
            />

            <Button colorScheme="linkedin" onClick={handleExpandRewards}>
              View Rewards
            </Button>
            {expandedRewards && (
              <Box borderBottom="1px" py={isMobile ? "5%" : "0%"}>
                <HStack
                  boxSize={isMobile ? "90%" : "40%"}
                  justify="space-between"
                >
                  <Text textAlign="left" fontSize={isMobile ? "xl" : "lg"}>
                    Completion
                    <br /> Failure
                  </Text>
                  <Text textAlign="right" fontSize={isMobile ? "xl" : "lg"}>
                    {quest.questIncentive[1]} CP
                    <br />
                    {quest.questIncentive[0]} CP
                  </Text>
                </HStack>{" "}
                <Text
                  boxSize={isMobile ? "90%" : "40%"}
                  fontSize={isMobile ? "md" : "lg"}
                  textAlign="left"
                  py="10px"
                >
                  *Challenger Points (CP) apply globally to the challenger's
                  profile. Read more about CP <b>here</b>.
                </Text>
              </Box>
            )}

            <VStack spacing="1" boxSize="100%" pt={isMobile ? "2%" : "3%"}>
              {quest &&
                quest.questTasks.map((task) => (
                  <Task
                    key={task.taskName}
                    task={task}
                    setCompletedTasks={setCompletedTasks}
                  />
                ))}
            </VStack>

            <VStack py="3%">
              <Button
                colorScheme="green"
                onClick={handleFinalSubmission}
                px="4%"
                py={isMobile ? "10%" : "3%"}
                w={isMobile ? "100%" : "60%"}
              >
                Complete Quest
              </Button>
              <Button
                colorScheme="red"
                onClick={handleFinalSubmission}
                px="4%"
                py={isMobile ? "10%" : "3%"}
                w={isMobile ? "100%" : "60%"}
              >
                Forfeit Quest
              </Button>
            </VStack>
          </Box>
        </Box>
      ) : (
        <Box
          bgColor="white"
          pt="1%"
          pb="1%"
          pl="5%"
          pr="5%"
          width="100%"
          color="black"
        >
          <Text textColor="black">Loading Data...</Text>
        </Box>
      )}
    </Box>
  );
};

export default QuestPage;
