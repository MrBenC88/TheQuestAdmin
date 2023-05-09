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

import { useState, useEffect } from "react";
import Link from "next/link";
import { sampleQuests } from "../constants/questData";
import SearchBar from "./SearchBar";

const BrowseQuest = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuest, setExpandedQuest] = useState(null);

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

      {sampleQuests
        .filter((q) => {
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
              top={isMobile ? "7%" : "auto"}
              bottom={isMobile ? "auto" : "45%"}
              right={isMobile ? "3%" : 0}
            >
              <Text
                color="black"
                fontSize={isMobile ? "md" : "2xl"}
                transform={isMobile ? "rotate(0deg)" : "rotate(90deg)"}
              >
                {q.questPermissions.toUpperCase()}
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
                    {q.questName}
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
                {q.questMembers.length} members | {q.questTasks.length} tasks
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
                    {q.questIncentive[1]} CP
                    <br />
                    {q.questIncentive[0]} CP
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
              bgColor={q.questColor}
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
                  <Button colorScheme="blue" w={isMobile ? "100%" : "auto"}>
                    Accept Quest
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
                  >
                    Accept Quest
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
