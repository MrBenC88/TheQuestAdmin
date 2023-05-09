import {
  Box,
  Text,
  Heading,
  VStack,
  Flex,
  Button,
  useBreakpointValue,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../constants/constants";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { questData } from "../constants/questData";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react";

const BrowseQuest = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuest, setExpandedQuest] = useState(null);
  const [questData, setQuestData] = useState([]);
  const [userAcceptedQuests, setUserAcceptedQuests] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchAcceptedQuests = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/userquests?userId=${session.user.id}&questList=true`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();

        setUserAcceptedQuests(responseData);
      } catch (error) {
        console.log("Error fetching data: ", error);
        // refetch if we fail
        // wait for 5 seconds before retrying
        setTimeout(fetchAcceptedQuests, 500);
      }
    };
    fetchAcceptedQuests();
  }, [session]);

  useEffect(() => {
    //  Fetch Global Quest Data
    console.log("API_BASE_URL: ", API_BASE_URL);
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quests`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setQuestData(responseData.quests);
        // console.log(JSON.stringify(responseData.quests));
      } catch (error) {
        console.log("Error fetching data: ", error);
        // wait for 5 seconds before retrying
        setTimeout(fetchData, 500);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      bgColor="white"
      pt="1%"
      pb="1%"
      pl="5%"
      pr="5%"
      width="100%"
      color="black"
    >
      {isMobile ? (
        <VStack pb="2%">
          <Heading color="black" size="lg">
            Browse Quests
          </Heading>
          <VStack w="100%">
            <SearchBar handleChange={setSearchQuery} />
            <Button w="100%" colorScheme="linkedin">
              Join Private Quest
            </Button>
          </VStack>
        </VStack>
      ) : (
        <HStack justify="space-between">
          <Heading color="black" size="lg">
            Browse Quests
          </Heading>
          <HStack w="75%">
            <SearchBar handleChange={setSearchQuery} />
            <Button px="7%" colorScheme="linkedin">
              Join Private Quest
            </Button>
          </HStack>
        </HStack>
      )}
      {/* {userAcceptedQuests.toString()} */}
      {questData
        .filter((q) => {
          // Exclude quests that the user has already accepted found in the userAcceptedQuests array
          // if (userAcceptedQuests.includes(q._id)) {
          //   return false;
          // }

          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          return (
            q.questName.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questDescription.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questType.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questCreator.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questStatus.toLowerCase().includes(lowerCaseSearchQuery)
          );
        })
        .map((q) => {
          // New function to handle card click
          const handleCardClick = () => {
            if (expandedQuest === q.questName) {
              setExpandedQuest(null);
            } else {
              setExpandedQuest(q.questName);
            }
          };

          const backgroundImageStyle = q.questImage
            ? {
                backgroundImage: `url(${q.questImage})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 30%",
                opacity: 0.15,
              }
            : {};

          const questPermissions = (
            <Box
              position="absolute"
              top={
                isMobile
                  ? "7%"
                  : userAcceptedQuests.includes(q._id)
                  ? "7%"
                  : "auto"
              }
              bottom={isMobile ? "auto" : "45%"}
              right={
                isMobile ? "3%" : userAcceptedQuests.includes(q._id) ? "3%" : 0
              }
            >
              <Text
                color="black"
                fontSize={isMobile ? "md" : "2xl"}
                transform={
                  isMobile
                    ? "rotate(0deg)"
                    : userAcceptedQuests.includes(q._id)
                    ? "rotate(0deg)"
                    : "rotate(90deg)"
                }
              >
                {userAcceptedQuests.includes(q._id)
                  ? "On Your List"
                  : q.questPermissions.toUpperCase()}
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
                      {q.questName}
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
                    {q.questType.toUpperCase()}
                  </Text>
                </>
              ) : (
                <HStack>
                  <Heading color="black" size="lg">
                    {q.questName}{" "}
                  </Heading>
                  <Text color="black" fontSize="xl">
                    {q.questType.toUpperCase()}
                  </Text>
                </HStack>
              )}

              <Text color="black" fontSize="sm" flexWrap w="95%">
                {q.questDescription}
                <br />
                Created by {q.questCreator}
                <br />
                {q.questTasks.length} tasks
              </Text>
            </VStack>
          );

          const questInnerDetails = (
            <Box align="left" py={isMobile ? "2%" : "0%"}>
              <Heading fontSize="lg" py="1%">
                Tasks:
              </Heading>

              {q?.questTasks.map((task) => (
                <Box
                  boxSize={isMobile ? "85%" : "95%"}
                  p="0.5%"
                  m="0.5%"
                  bgColor="gray.100"
                  border="1px"
                  borderRadius="10px"
                  key={task.taskName}
                >
                  <Box justify="flex-start">
                    <Text
                      fontSize={isMobile ? "md" : "md"}
                      textAlign="left"
                      as="b"
                      w={isMobile ? "80%" : "100%"}
                    >
                      {task.taskName} <br />
                    </Text>
                    <Text
                      fontSize={isMobile ? "md" : "sm"}
                      textAlign="left"
                      w={isMobile ? "80%" : "100%"}
                    >
                      Detail: {task.taskDescription}
                    </Text>
                  </Box>
                </Box>
              ))}
              <Box py={isMobile ? "5%" : "0%"}>
                <Heading fontSize="lg" pb="0.5%">
                  Rewards
                </Heading>
                <HStack
                  boxSize={isMobile ? "90%" : "40%"}
                  justify="space-between"
                >
                  <Text textAlign="left" fontSize={"md"}>
                    Completion
                    <br /> Failure
                  </Text>
                  <Text textAlign="right" fontSize={"md"}>
                    {q.reward} CP
                    <br />
                    {q.punishment} CP
                  </Text>
                </HStack>{" "}
                <Text
                  boxSize={isMobile ? "90%" : "40%"}
                  fontSize={"md"}
                  textAlign="left"
                  pb="0.5%"
                >
                  Challenger Points (CP) apply globally to the challenger's
                  profile.
                </Text>
              </Box>
            </Box>
          );
          return (
            <Box
              key={q.questName}
              bgColor={
                userAcceptedQuests.includes(q._id) ? "lightgreen" : q.questColor
              }
              py={isMobile ? "5%" : "1%"}
              px={"5%"}
              width="100%"
              textColor="black"
              border="1px"
              borderColor="gray.200"
              borderRadius="lg"
              boxShadow="lg"
              my="1%"
              position="relative"
              _hover={{
                bg: "gray.100",
                transform: "scale(1.02)",
                boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
              }}
              transition="0.2s ease"
              onClick={handleCardClick} // New onClick handler
            >
              {q.questName}
              {questDetails}
              {questPermissions}
              <Text
                position="absolute"
                bottom="1%"
                right="1%"
                fontSize={isMobile ? "lg" : "xl"}
                color="black"
                cursor="pointer"
              >
                {expandedQuest === q.questName
                  ? isMobile
                    ? "Tap to collapse"
                    : "Click to collapse"
                  : isMobile
                  ? "Tap to expand"
                  : "Click to expand"}
              </Text>
              {expandedQuest === q.questName && questInnerDetails}
              {isMobile ? (
                <VStack
                  py={isMobile ? "1%" : "4%"}
                  spacing={1}
                  width="100%"
                  mt={expandedQuest === q.questName ? "1%" : "15%"}
                  mb="2%"
                >
                  <Button
                    colorScheme="yellow"
                    w={isMobile ? "100%" : "auto"}
                    onClick={handleCardClick}
                  >
                    {expandedQuest ? "Close Details " : "View Details"}
                  </Button>
                  <Button
                    colorScheme="blue"
                    w={isMobile ? "100%" : "auto"}
                    isDisabled={userAcceptedQuests.includes(q._id)}
                  >
                    {"Accept Quest"}
                  </Button>
                </VStack>
              ) : (
                <HStack py="2%" spacing={isMobile ? 4 : 2} width="100%">
                  <Button
                    colorScheme="yellow"
                    p="2%"
                    w={isMobile ? "100%" : "auto"}
                    onClick={handleCardClick}
                  >
                    {expandedQuest ? "Close Details " : "View Details"}
                  </Button>
                  <Button
                    colorScheme="blue"
                    p="2%"
                    ml={!isMobile && "1%"}
                    w={isMobile ? "100%" : "auto"}
                    isDisabled={userAcceptedQuests.includes(q._id)}
                  >
                    {"Accept Quest"}
                  </Button>
                </HStack>
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default BrowseQuest;
