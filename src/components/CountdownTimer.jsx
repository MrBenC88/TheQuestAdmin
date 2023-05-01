import { useState, useEffect } from "react";
import { Text, Box, useMediaQuery, Progress, Button } from "@chakra-ui/react";

const CountdownTimer = ({ remainingTime }) => {
  const [countdown, setCountdown] = useState(null);
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const endDate = new Date().getTime() + remainingTime * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countdownString = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

      setCountdown(countdownString);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const calculateProgress = () => {
    if (!countdown) return 100;
    const elapsedSeconds = remainingTime - parseInt(countdown.split(" ")[2]);
    const remainingProgress = (elapsedSeconds / remainingTime) * 100;

    return remainingProgress;
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
      <Box textAlign="center" bgColor="black">
        <Progress
          value={calculateProgress()}
          size="lg"
          colorScheme={calculateProgress() < 10 ? "red" : "linkedin"}
        />
      </Box>
      <Text textColor="black" textAlign="right" fontSize="lg">
        Time Remaining: {calculateProgress().toFixed(7)} %
      </Text>
    </Box>
  );
};

export default CountdownTimer;
