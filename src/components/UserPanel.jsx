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

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const sampleQuests = [
  {
    questName: "Saitama Series",
    questDescription: "A series of quests to help you become a hero.",
    questImage: "https://i.imgur.com/YszkbTB.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "Saitama",
    questMembers: ["Saitama", "Genos", "King", "Mumen Rider"],
    questTasks: [
      {
        taskName: "100 Pushups",
        taskDescription: "Do 100 pushups.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "100 Situps",
        taskDescription: "Do 100 situps.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "100 Squats",
        taskDescription: "Do 100 squats.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "10km Run",
        taskDescription: "Run 10km.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "Meditation Challenge",
    questDescription: "Meditate for 30 minutes every day.",
    questImage: "https://i.imgur.com/PNbhJeK.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "User123",
    questMembers: ["User123", "User456"],
    questTasks: [
      {
        taskName: "Meditation",
        taskDescription: "Meditate for 30 minutes.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "No Sugar Challenge",
    questDescription: "Avoid consuming sugar for 30 days.",
    questImage: "https://i.imgur.com/Bvp6g5B.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "HealthNut",
    questMembers: ["HealthNut", "FitnessFanatic", "HealthyEater"],
    questTasks: [
      {
        taskName: "No Sugar",
        taskDescription: "Avoid consuming sugar for 30 days.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "30 Day Yoga Challenge",
    questDescription: "Complete 30 days of yoga.",
    questImage: "https://i.imgur.com/4R8yktG.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "YogaGuru",
    questMembers: ["YogaGuru", "YogaEnthusiast"],
    questTasks: [
      {
        taskName: "Yoga",
        taskDescription: "Complete 30 days of yoga.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "Healthy Habits",
    questDescription:
      "Develop a series of healthy habits to improve your overall well-being.",
    questImage: "https://i.imgur.com/4tfn9f9.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "Healthy Habits Inc.",
    questMembers: ["John Doe", "Jane Smith", "Bob Johnson"],
    questTasks: [
      {
        taskName: "Drink 8 Glasses of Water",
        taskDescription: "Drink 8 glasses (64 oz) of water throughout the day.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "Get 8 Hours of Sleep",
        taskDescription: "Get at least 8 hours of sleep every night.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "Eat 5 Servings of Fruits and Vegetables",
        taskDescription: "Eat 5 servings of fruits and vegetables every day.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "Learn a New Language",
    questDescription: "Take on the challenge of learning a new language.",
    questImage: "https://i.imgur.com/2QjZNrN.png",
    questType: "weekly",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "Language Learners Club",
    questMembers: [
      "Maria Garcia",
      "Yuto Nakamura",
      "Risa Tanaka",
      "Pablo Martinez",
    ],
    questTasks: [
      {
        taskName: "Complete 5 Duolingo Lessons",
        taskDescription: "Complete 5 lessons on Duolingo every day.",
        taskStatus: "active",
        taskType: "daily",
      },
      {
        taskName: "Watch a Movie in Your Target Language",
        taskDescription: "Watch a movie in the language you are learning.",
        taskStatus: "active",
        taskType: "weekly",
      },
      {
        taskName: "Have a Conversation with a Native Speaker",
        taskDescription:
          "Have a 10-minute conversation with a native speaker of the language you are learning.",
        taskStatus: "active",
        taskType: "weekly",
      },
    ],
    questColor: getRandomColor(),
  },
];

const UserPanel = () => {
  return (
    <Box
      bgColor="white"
      pt="1%"
      pb="1%"
      pl="5%"
      pr="5%"
      width="100%"
      textColor="black"
    >
      <Heading color="black" size="lg">
        User Panel
      </Heading>
      {sampleQuests.map((q) => {
        return (
          <Box
            key={q.questName}
            bgColor={q.questColor}
            pt="1%"
            pb="1%"
            pl="5%"
            pr="5%"
            width="100%"
            textColor="black"
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="lg"
            mt="2%"
          >
            <Heading color="black" size="md">
              {q.questName}
            </Heading>
            <Text color="black" fontSize="sm">
              {q.questDescription}
            </Text>
            <Text color="black" fontSize="sm">
              {q.questType}
            </Text>
            <Text color="black" fontSize="sm">
              {q.questStatus}
            </Text>
            <Text color="black" fontSize="sm">
              {q.questPermissions}
            </Text>
            <Text color="black" fontSize="sm">
              {q.questOwner}
            </Text>
            <Text color="black" fontSize="sm">
              {q.questMembers}
            </Text>
            {/* <Text color="black" fontSize="sm">
              {quest.questTasks}
            </Text> */}
          </Box>
        );
      })}
    </Box>
  );
};

export default UserPanel;
