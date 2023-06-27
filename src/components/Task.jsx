import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  useMediaQuery,
  HStack,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";

const Task = ({ key, task, setCompletedTasks }) => {
  const [proof, setProof] = useState("");
  const [isComplete, setIsTaskComplete] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const handleTaskSubmit = () => {
    setIsTaskComplete(!isComplete);
    if (!isComplete) {
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks + 1);
    } else {
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks - 1);
    }
  };

  return (
    <>
      <Box
        boxSize={isMobile ? "100%" : "95%"}
        bgColor={isComplete ? "green.300" : "gray.200"}
        p="1%"
        borderRadius="10px"
        key={task.taskName}
      >
        <HStack justify="space-between">
          <Text
            fontSize={isMobile ? "md" : "xl"}
            textAlign="left"
            w={isMobile ? "80%" : "100%"}
          >
            {task.taskName} <br />
            Detail: {task.taskDescription}
          </Text>
          <Button
            colorScheme="linkedin"
            onClick={handleTaskSubmit}
            disabled={isComplete}
          >
            {isComplete ? "Unsubmit" : "Complete"}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Task;
