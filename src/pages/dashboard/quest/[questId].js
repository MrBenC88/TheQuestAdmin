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
import { useSession } from "next-auth/react";
import { API_BASE_URL } from "../../../constants/constants";

const QuestPage = () => {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [isQuestCompleted, setIsQuestCompleted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [expandedRewards, setExpandedRewards] = useState(false);
  const { data: session, status } = useSession();
  const [questData, setQuestData] = useState({});

  const [userQuestStatus, setUserQuestStatus] = useState("");
  const [userQuestPoints, setUserQuestPoints] = useState(0);
  const [userQuestStreak, setUserQuestStreak] = useState(0);

  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { questId } = router.query;
  const [remainingTime, setRemainingTime] = useState(
    moment.tz("America/Los_Angeles").endOf("day").diff(moment(), "seconds")
  );

  // const fetchUserQuestStatus = async () => {
  //   if (!session) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `${API_BASE_URL}/userquest?id=${questId}&userId=${session?.user?.id}&getStatus=true`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const responseData = await response.json();

  //     // console.log("responseData: ", JSON.stringify(responseData[0].streak));
  //     setUserQuestStatus(responseData[0].userQuestStatus);
  //     setUserQuestPoints(responseData[0].points);
  //     setUserQuestStreak(responseData[0].streak);
  //   } catch (error) {
  //     console.log("Failed to fetch user quest status. Please try again.");
  //     setTimeout(fetchUserQuestStatus, 5000);
  //   }
  // };

  useEffect(() => {
    // console.log("API_BASE_URL: ", API_BASE_URL);
    if (!session) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/userquest?id=${questId}&userId=${session?.user?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setQuestData(responseData);
        setUserQuestStatus(responseData[0].userQuestStatus);
        setUserQuestPoints(responseData[0].points);
        setUserQuestStreak(responseData[0].streak);
      } catch (error) {
        console.log("Error fetching data: ", error);
        // refetch if we fail
        // wait for 5 seconds before retrying
        setTimeout(fetchData, 5000);
      }
    };
    fetchData();
  }, [session]);

  const handleFinalSubmission = async () => {
    if (isQuestCompleted) {
      // PUT request to update quest status and award points
      try {
        const response = await fetch(
          `${API_BASE_URL}/userquest?id=${questId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userQuestStatus: "complete",
              points: userQuestPoints + questData[0]?.questId.reward,
              streak: userQuestStreak + 1,
            }),
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        alert("Quest completed!");
      } catch (error) {
        console.log(
          "Failed to complete quest. Please try again." + error.response
        );
        //setTimeout(handleFinalSubmission, 500);
      }
    } else {
      alert(
        "Quest is not complete. Please complete all tasks before submitting."
      );
    }
  };

  const handleForfeit = async () => {
    // PUT request to update quest status and award points
    try {
      const response = await fetch(`${API_BASE_URL}/userquest?id=${questId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestStatus: "cancelled",
          points: userQuestPoints + questData[0]?.questId.punishment,
          streak: 0,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      alert("Quest cancelled!");
    } catch (error) {
      alert("Failed to cancel quest. Please try again.");
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

  useEffect(() => {
    // set interval to update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (remainingTime <= 0) {
  //     // if remaining time reaches 0, reset to the number of seconds until midnight PST
  //     setRemainingTime(
  //       moment.tz("America/Los_Angeles").endOf("day").diff(moment(), "seconds")
  //     );
  //   }
  // }, [remainingTime]);

  useEffect(() => {
    let remainingSeconds;
    switch (questData[0]?.questId?.questType) {
      case "daily":
        remainingSeconds = moment
          .tz("America/Los_Angeles")
          .endOf("day")
          .diff(moment(), "seconds");
        break;
      case "weekly":
        remainingSeconds = moment
          .tz("America/Los_Angeles")
          .endOf("isoWeek")
          .diff(moment(), "seconds");
        break;
      case "monthly":
        remainingSeconds = moment
          .tz("America/Los_Angeles")
          .endOf("month")
          .diff(moment(), "seconds");
        break;
      case "nodeadline":
        remainingSeconds = Infinity;
        break;
      default:
        remainingSeconds = moment
          .tz("America/Los_Angeles")
          .endOf("day")
          .diff(moment(), "seconds");
    }
    setRemainingTime(remainingSeconds);
  }, [questData[0]?.questId?.questType]);

  useEffect(() => {
    if (
      remainingTime <= 0 &&
      questData[0]?.questId?.questType !== "nodeadline"
    ) {
      // if remaining time reaches 0, reset based on the quest type
      let remainingSeconds;
      switch (questData[0]?.questId?.questType) {
        case "daily":
          remainingSeconds = moment
            .tz("America/Los_Angeles")
            .endOf("day")
            .diff(moment(), "seconds");
          break;
        case "weekly":
          remainingSeconds = moment
            .tz("America/Los_Angeles")
            .endOf("isoWeek")
            .diff(moment(), "seconds");
          break;
        case "monthly":
          remainingSeconds = moment
            .tz("America/Los_Angeles")
            .endOf("month")
            .diff(moment(), "seconds");
          break;
        default:
          remainingSeconds = moment
            .tz("America/Los_Angeles")
            .endOf("day")
            .diff(moment(), "seconds");
      }
      setRemainingTime(remainingSeconds);
    }
  }, [remainingTime, questData[0]?.questId?.questType]);

  useEffect(() => {
    if (completedTasks === questData[0]?.questId?.questTasks?.length) {
      setIsQuestCompleted(true);
      console.log("Quest completed!");
    }
  }, [completedTasks]);

  const backgroundImageStyle = questData[0]?.questId?.questImage
    ? {
        backgroundImage: `url(${questData[0].questId?.questImage})`,
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
        {questData[0]?.questId?.questStatus?.toUpperCase()}
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
              {questData[0]?.questId?.questName}
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
            {questData[0]?.questId?.questType?.toUpperCase()}
          </Text>
        </>
      ) : (
        <HStack>
          <Heading color="black" size="lg">
            {questData[0]?.questId?.questName}
          </Heading>
          <Text color="black" fontSize="xl">
            {questData[0]?.questId?.questType?.toUpperCase()}
          </Text>
        </HStack>
      )}

      <Text color="black" fontSize="sm" flexWrap w="95%">
        {questData[0]?.questId?.questDescription}
        <br />
        Created by {questData[0]?.questId?.questCreator}
        <br />
        {questData[0]?.questId?.questTasks?.length} tasks | Invite Code:{" "}
        {questData[0]?.questId?.inviteCode}
      </Text>
    </VStack>
  );

  return (
    <Box boxSize="100%" bgColor="orange.50">
      <DashboardHeader />

      {questData[0] ? (
        <Box
          bgColor="white"
          py="0.5%"
          px={isMobile ? "3%" : "5%"}
          width="100%"
          color="black"
        >
          <Heading color="black" size="lg">
            {questData[0]?.questId?.questType.toUpperCase()} | Quest ID:{" "}
            {questData[0]?.questId?._id} | Streak: {userQuestStreak}
          </Heading>
          <Box
            key={questData[0]?.questId?.questName}
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
              {questData[0].questId?.questName}
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
              type={questData[0]?.questId?.questType}
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
                    {questData[0]?.questId?.reward} CP
                    <br />
                    {questData[0]?.questId?.punishment} CP
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
              {questData[0] &&
                questData[0]?.questId?.questTasks.map((task) => (
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
                onClick={handleForfeit}
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
