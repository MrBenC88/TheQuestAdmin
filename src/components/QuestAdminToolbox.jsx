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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { defaultConfig } from "next/dist/server/config-shared";
import { API_BASE_URL } from "../constants/constants";
import { useSession } from "next-auth/react";
import { SketchPicker } from "react-color";
import DemoQuestPanel from "../components/DemoQuestPanel";

import { useState, useEffect } from "react";
import Link from "next/link";

const rgbToHex = (rgb) => {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
};

const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )})`
    : null;
};

const QuestAdminToolBox = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const { data: session, status } = useSession();

  const defaultFormData = {
    questName: "Sample Quest",
    questDescription: "A sample quest for testing purposes",
    questImage: "",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questCreator: "Sample Creator",
    questCreatorId: session ? session.user.id : "6158b5f50d1c9546f7e078e1",
    questTasks: [],
    questColor: "rgb(214, 216, 252)",
    punishment: 0,
    reward: 0,
    inviteCode: "SAMPLEINVITECODE",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const toast = useToast();

  const handleSubmitQuest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      // Show the toast upon successful submission

      if (response.ok) {
        toast({
          title: "Quest submission successful.",
          description: "Your quest has been successfully submitted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // reset form data
        setFormData(defaultFormData);
      } else {
        toast({
          title: "An error occurred.",
          description: "Unable to submit your quest.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = (color) => {
    setColor(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
    setFormData({
      ...formData,
      questColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTaskChange = (e, index) => {
    const newTasks = [...formData.questTasks];
    newTasks[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questTasks: newTasks });
  };

  const handleAddTask = () => {
    setFormData({
      ...formData,
      questTasks: [
        ...formData.questTasks,
        {
          taskName: "",
          taskDescription: "",
          taskStatus: "inprogress",
          taskType: "nodeadline",
        },
      ],
    });
  };

  const handleRemoveTask = () => {
    const newTasks = [...formData.questTasks];
    newTasks.pop();
    setFormData({ ...formData, questTasks: newTasks });
  };

  return (
    <Box bgColor="white" pt="2%" pb="1%" pl="5%" pr="5%" width="100%">
      {!session ? (
        <Box p="5%">
          <Text textColor="black">Login to access quest builder tool!</Text>
        </Box>
      ) : (
        <Box width="100%">
          <Heading textColor="black">Quest Admin Toolbox</Heading>
          <Text textColor="black">
            A tool to add quests to the global quest list.
          </Text>
          {isMobile ? (
            <VStack align="right" boxW="100%" pt="2%" justify="space-between">
              <VStack align="left">
                <Text fontSize="xl" textColor="black" as="b">
                  View Quest Preview
                  <br />
                  UserId: {session && session?.user?.id}
                </Text>
                <Text fontSize="md" textColor="black">
                  Modify the fields in the form below and see a preview of the
                  quest. Note that the invite code must be unique and the quest
                  creator id must be a valid user id.
                </Text>
              </VStack>
              <Button colorScheme="green" onClick={handleSubmitQuest}>
                Submit Quest
              </Button>
            </VStack>
          ) : (
            <HStack align="right" boxW="100%" pt="2%" justify="space-between">
              <VStack align="left">
                <Text fontSize="xl" textColor="black" as="b">
                  View Quest Preview | UserId: {session && session?.user?.id}
                </Text>
                <Text fontSize="md" textColor="black">
                  Modify the fields in the form below and see a preview of the
                  quest. Note that the invite code must be unique and the quest
                  creator id must be a valid user id.
                </Text>
              </VStack>
              <Button colorScheme="green" onClick={handleSubmitQuest}>
                Submit Quest
              </Button>
            </HStack>
          )}

          <DemoQuestPanel q={formData} />

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
            color="black"
          >
            <Box
              bgColor="lightgray"
              py="2%"
              px="2%"
              maxH="80vh"
              overflowY="auto"
            >
              <FormControl isRequired textColor="black">
                <FormLabel>Quest Name</FormLabel>
                <Input
                  type="text"
                  name="questName"
                  placeholder="Quest Name"
                  value={formData.questName}
                  onChange={handleChange}
                  textColor="black"
                  _placeholder={{ color: "black" }}
                />

                <FormLabel>Quest Description</FormLabel>
                <Input
                  type="text"
                  name="questDescription"
                  placeholder="Quest Description"
                  value={formData.questDescription}
                  onChange={handleChange}
                  textColor="black"
                  _placeholder={{ color: "black" }}
                />

                <FormLabel>Quest Image</FormLabel>
                <Input
                  type="text"
                  name="questImage"
                  placeholder="Quest Image"
                  value={formData.questImage}
                  onChange={handleChange}
                  textColor="black"
                  _placeholder={{ color: "black" }}
                />

                <FormLabel as="legend" htmlFor={null}>
                  Select Quest Type
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select Quest Type"
                  value={formData.questType}
                  onChange={(e) =>
                    setFormData({ ...formData, questType: e.target.value })
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="oneoff">One off</option>
                  <option value="nodeadline">No Deadline</option>
                </Select>

                <FormLabel as="legend" htmlFor={null}>
                  Select Quest Status
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select Quest Status"
                  value={formData.questStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, questStatus: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>

                <FormLabel as="legend" htmlFor={null}>
                  Select Quest Permissions
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder="Select Quest Permissions"
                  value={formData.questPermissions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      questPermissions: e.target.value,
                    })
                  }
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Select>

                <FormLabel>Quest Creator</FormLabel>
                <Input
                  type="text"
                  name="questCreator"
                  placeholder="Quest Creator"
                  value={formData.questCreator}
                  onChange={handleChange}
                  textColor="black"
                  _placeholder={{ color: "black" }}
                />

                <FormLabel>Quest Creator Id</FormLabel>
                <Input
                  type="text"
                  name="questCreatorId"
                  placeholder="Quest Creator Id"
                  value={formData.questCreatorId}
                  onChange={handleChange}
                  textColor="black"
                  _placeholder={{ color: "black" }}
                />
              </FormControl>

              {formData.questTasks.map((task, index) => (
                <Box key={index} bgColor="lightblue">
                  <FormControl>
                    <FormLabel>Task Name</FormLabel>
                    <Input
                      type="text"
                      name="taskName"
                      value={task.taskName}
                      onChange={(e) => handleTaskChange(e, index)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Task Description</FormLabel>
                    <Input
                      type="text"
                      name="taskDescription"
                      value={task.taskDescription}
                      onChange={(e) => handleTaskChange(e, index)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Task Status</FormLabel>
                    <Select
                      name="taskStatus"
                      value={task.taskStatus}
                      onChange={(e) => handleTaskChange(e, index)}
                    >
                      <option value="complete">Complete</option>
                      <option value="incomplete">Incomplete</option>
                      <option value="inprogress">In Progress</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Task Type</FormLabel>
                    <Select
                      name="taskType"
                      value={task.taskType}
                      onChange={(e) => handleTaskChange(e, index)}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="annually">Annually</option>
                      <option value="oneoff">One Off</option>
                      <option value="nodeadline">No Deadline</option>
                    </Select>
                  </FormControl>
                </Box>
              ))}

              <Box align="right" pt="2%">
                <Button colorScheme="linkedin" onClick={handleAddTask}>
                  Add Task
                </Button>
                <Button colorScheme="red" onClick={handleRemoveTask}>
                  Remove Task
                </Button>
              </Box>
              <FormControl>
                <FormLabel>Pick Quest Color</FormLabel>
                <Input
                  type="text"
                  name="questColor"
                  placeholder="Quest Color"
                  value={color}
                  onChange={(e) => {
                    const newColor = hexToRgb(e.target.value);
                    if (newColor) {
                      setColor(newColor);
                    }
                  }}
                />
              </FormControl>
              <SketchPicker
                color={rgbToHex(color)}
                onChange={handleColorChange}
              />

              <FormLabel>Reward</FormLabel>
              <NumberInput>
                <NumberInputField
                  name="reward"
                  value={formData.reward}
                  onChange={handleChange}
                />
              </NumberInput>

              <FormLabel>Punishment</FormLabel>
              <NumberInput>
                <NumberInputField
                  name="punishment"
                  value={formData.punishment}
                  onChange={handleChange}
                />
              </NumberInput>

              <FormLabel>Quest Invite Code</FormLabel>
              <Input
                type="text"
                name="inviteCode"
                placeholder="Quest Invite Code"
                value={formData.inviteCode}
                onChange={handleChange}
                textColor="black"
                _placeholder={{ color: "black" }}
              />
            </Box>

            <Box py="3%" maxH="80vh" overflowY="auto">
              <Heading py="1%">Quest Submission Preview</Heading>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Box>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default QuestAdminToolBox;
