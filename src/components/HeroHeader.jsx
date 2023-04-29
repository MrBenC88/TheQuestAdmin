import {
  Box,
  Text,
  Link,
  Heading,
  VStack,
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import img from "../../public/splashasset.png";
import * as URL_CONSTANTS from "../constants/constants.js";

const HeroHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bgColor="white" pt="1%" pb="1%" pl="5%" pr="5%" width="100%">
      <Flex
        direction={isMobile ? "column" : "row"}
        pt="3%"
        pb="3%"
        alignItems="center"
      >
        <VStack pt="2%" boxSize="100%" textAlign="center">
          <Heading as="h1" size="3xl" textColor="black" boxSize="40%">
            Transform your goals into <i>adventures</i>.
          </Heading>
          <Text textColor="black" fontSize="lg" pt="1%" boxSize="40%">
            Our platform transforms everyday tasks into exciting quests,
            motivating you to conquer challenges and achieve your goals with a
            sense of adventure and fun.
          </Text>
          <Flex width="100%" pt="2%" justifyContent="center">
            <Box pl={isMobile ? 0 : "1%"} pr={isMobile ? 0 : "1%"}>
              {" "}
              <a href={URL_CONSTANTS.DISCORD_URL}>
                <Button colorScheme="linkedin" size={isMobile ? "lg" : "md"}>
                  Join us
                </Button>
              </a>
            </Box>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HeroHeader;
