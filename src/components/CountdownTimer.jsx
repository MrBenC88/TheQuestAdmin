import { useState, useEffect } from "react";
import { Text, Box, useMediaQuery, Progress, Button } from "@chakra-ui/react";

// Note: MODIFY if different quest type. Currently it is only set to 24 hours.
const CountdownTimer = ({ remainingTime, countdown }) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  // useEffect(() => {
  //   const endDate = new Date().getTime() + remainingTime * 1000;

  //   const interval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = endDate - now;

  //     const hours = Math.floor(distance / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     const countdownString = `${hours.toString().padStart(2, "0")}h ${minutes
  //       .toString()
  //       .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

  //     setCountdown(countdownString);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [remainingTime]);

  const calculateProgress = () => {
    // this calculates progress for 24 hours (86400) only
    if (!remainingTime) return 0;
    const remainingProgress = (remainingTime / 86400) * 100;
    return Math.max(0, Math.min(remainingProgress, 100));
  };
  return (
    <Box py="1%">
      <Box textAlign="center">
        <Text fontSize={isMobile ? "2xl" : "xl"} textColor="black">
          Quest expiring in:
        </Text>
        <Text fontSize={isMobile ? "5xl" : "6xl"} textColor="black">
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
