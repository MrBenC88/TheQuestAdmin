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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proof, setProof] = useState("");
  const [isComplete, setIsTaskComplete] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const handleCompleteTask = () => {
    setIsModalOpen(true);
  };

  const handleTaskSubmit = () => {
    // handle PUT request to update each task status
    // also handle proof submission
    setIsModalOpen(false);
    setIsTaskComplete(true);
    setCompletedTasks((prevCompletedTasks) => prevCompletedTasks + 1);
  };

  const handleProofChange = (event) => {
    setProof(event.target.value);
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
            onClick={handleCompleteTask}
            disabled={isComplete}
          >
            {isComplete ? "Completed" : "Complete"}
          </Button>
        </HStack>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent h="80%">
          <ModalHeader>Submit proof of completion</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody>
            <Text textColor="black" as="b">
              {task.taskName}
            </Text>

            <Text textColor="black" py="10%">
              Details: <br />
              {task.taskDescription}
            </Text>
            <Input
              placeholder="Upload screenshot or other form of proof here..."
              value={proof}
              onChange={handleProofChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleTaskSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Task;
