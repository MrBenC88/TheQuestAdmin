import { useState, useEffect } from "react";
import { Text, Box, useMediaQuery, Progress, Button } from "@chakra-ui/react";
import { QUEST_DURATIONS } from "../constants/constants";

const CountdownTimer = ({ remainingTime, countdown, type }) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const calculateProgress = () => {
    // this calculates progress for based on specific type.
    if (!remainingTime || !type || !QUEST_DURATIONS[type]) return 0;
    const totalDuration = QUEST_DURATIONS[type];
    const remainingProgress = (remainingTime / totalDuration) * 100;
    return Math.max(0, Math.min(remainingProgress, 100));
  };
  return (
    <Box py="1%">
      <Box textAlign="center">
        <Text fontSize={"lg"} textColor="black">
          Quest expiring in:
        </Text>
        <Text fontSize={"6xl"} textColor="black">
          {countdown}
        </Text>
      </Box>
      <Box textAlign="center">
        <Progress
          value={calculateProgress()}
          size="lg"
          colorScheme={
            calculateProgress() < 25
              ? "red"
              : calculateProgress() < 50
              ? "yellow"
              : "linkedin"
          }
          bg="gray.700"
        />
      </Box>
      <Text textColor="black" textAlign="right" fontSize="lg">
        Time Remaining: {calculateProgress().toFixed(2)} %
      </Text>
    </Box>
  );
};

export default CountdownTimer;
