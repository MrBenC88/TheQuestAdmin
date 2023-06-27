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
  Grid,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { questData } from "../constants/questData";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react";
import { API_BASE_URL } from "../constants/constants";

const UserPanel = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const [questData, setQuestData] = useState([]);

  useEffect(() => {
    console.log("API_BASE_URL: ", API_BASE_URL);
    const fetchData = async () => {
      try {
        if (!session) {
          return;
        }
        const response = await fetch(
          `${API_BASE_URL}/userquests?userId=${session?.user?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setQuestData(responseData);
        // console.log(JSON.stringify(responseData));
      } catch (error) {
        console.log("Error fetching data: ", error);
        // refetch if we fail
        // wait for 5 seconds before retrying
        setTimeout(fetchData, 500);
      }
    };
    fetchData();
  }, [session]);
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

      {!session && (
        <Box py="5%">
          <Text textColor="black">
            Login to start adding to your quest list!
          </Text>
        </Box>
      )}

      <Flex
        direction={{ base: "column", lg: "row" }}
        wrap={useBreakpointValue({ base: "nowrap", lg: "wrap" })}
        justify="space-evenly"
      >
        {questData
          .filter((q) => {
            if (q.userQuestStatus === "cancelled") return false;
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            return (
              q.questId.questName
                .toLowerCase()
                .includes(lowerCaseSearchQuery) ||
              q.questId.questDescription
                .toLowerCase()
                .includes(lowerCaseSearchQuery) ||
              q.questId.questType
                .toLowerCase()
                .includes(lowerCaseSearchQuery) ||
              q.questId.questCreator
                .toLowerCase()
                .includes(lowerCaseSearchQuery) ||
              q.questId.questStatus.toLowerCase().includes(lowerCaseSearchQuery)
            );
          })
          .sort((a, b) => b.streak - a.streak) // Sorts descending order by streak count
          .map((q) => {
            const backgroundImageStyle = q.questId.questImage
              ? {
                  backgroundImage: `url(${q.questId.questImage})`,
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
                  {q.questId.questStatus.toUpperCase()}
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
                        {q.questId.questName}
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
                      {q.questId.questType.toUpperCase()}
                    </Text>
                  </>
                ) : (
                  <HStack>
                    <Heading color="black" size="lg">
                      {q.questId.questName}
                    </Heading>
                    <Text color="black" fontSize="xl">
                      {q.questId.questType.toUpperCase()}
                    </Text>
                  </HStack>
                )}
                <Text color="black" fontSize="sm" flexWrap w="95%">
                  {q.questId.questDescription}
                  <br />
                  Created by {q.questId.questCreator}
                  <br />
                  {q.questId.questTasks.length} tasks
                  <br />
                </Text>
                <Text color="black" fontSize="xl">
                  Streak Count: {q.streak}
                  <br />
                  Points: {q.points}
                </Text>
              </VStack>
            );

            return (
              <Box
                key={q.questId.questName}
                bgColor={q.questId.questColor}
                py="5%"
                px="5%"
                width={isMobile ? "100%" : "45%"}
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
                  <Link href={`/dashboard/quest/${q._id}`}>
                    {q.questName}
                    {questDetails}
                    {questStatus}
                  </Link>
                </>
              </Box>
            );
          })}
      </Flex>
    </Box>
  );
};

export default UserPanel;
