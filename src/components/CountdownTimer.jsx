import { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";

const CountdownTimer = ({ remainingTime }) => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // create a new date object to get current time and add the remaining time in seconds
    const endDate = new Date().getTime() + remainingTime * 1000;

    // set interval to update countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      // calculate remaining time in hours, minutes, and seconds
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // format countdown string as XXh:XXm:XXs
      const countdownString = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;

      // update state with countdown string
      setCountdown(countdownString);
    }, 1000);

    // cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <Text fontSize="6xl" textColor="black">
      {countdown}
    </Text>
  );
};

export default CountdownTimer;
