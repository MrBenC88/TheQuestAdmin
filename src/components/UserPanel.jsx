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

const UserPanel = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [searchQuery, setSearchQuery] = useState("");

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
            Your Quests
          </Heading>
          <Box w="100%">
            <SearchBar handleChange={setSearchQuery} />
          </Box>
        </VStack>
      ) : (
        <HStack justify="space-between">
          <Heading color="black" size="lg">
            Your Quests
          </Heading>
          <Box w="50%">
            <SearchBar handleChange={setSearchQuery} />
          </Box>
        </HStack>
      )}

      {sampleQuests
        .filter((q) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          return (
            q.questName.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questDescription.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questType.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questOwner.toLowerCase().includes(lowerCaseSearchQuery) ||
            q.questStatus.toLowerCase().includes(lowerCaseSearchQuery)
          );
        })
        .map((q) => {
          const backgroundImageStyle = q.questImage
            ? {
                backgroundImage: `url(${q.questImage})`,
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
                {q.questStatus.toUpperCase()}
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
                Created by {q.questOwner}
                <br />
                {q.questMembers.length} members | {q.questTasks.length} tasks
              </Text>
            </VStack>
          );

          return (
            <Box
              key={q.questName}
              bgColor={q.questColor}
              py="5%"
              px="5%"
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
            >
              <>
                <Link href={`/dashboard/quest/${q.questId}`}>
                  {q.questName}
                  {questDetails}
                  {questStatus}
                </Link>
              </>
            </Box>
          );
        })}
    </Box>
  );
};

export default UserPanel;
