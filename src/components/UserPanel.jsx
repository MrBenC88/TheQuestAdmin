import {
  Box,
  Text,
  Link,
  Heading,
  VStack,
  Flex,
  Button,
  useBreakpointValue,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 128) + 128;
  const g = Math.floor(Math.random() * 128) + 128;
  const b = Math.floor(Math.random() * 128) + 128;
  return `rgb(${r}, ${g}, ${b})`;
};

const sampleQuests = [
  {
    questName: "Saitama Series",
    questDescription: "A series of quests to help you become a hero.",
    questImage: "https://i.imgur.com/pIbtdfv.png",
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
    questImage: "https://i.imgur.com/AiAYv1X.png",
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
    questName: "Learning Music Challenge",
    questDescription: "Learn music consistently for 30 days.",
    questImage: "https://i.imgur.com/vujGOqC.png",
    questType: "daily",
    questStatus: "active",
    questPermissions: "public",
    questOwner: "MusicMaster",
    questMembers: ["MusicMaster", "MusicMaster2", "MusicMaster3"],
    questTasks: [
      {
        taskName: "Practice Music",
        taskDescription: "Practice everyday.",
        taskStatus: "active",
        taskType: "daily",
      },
    ],
    questColor: getRandomColor(),
  },
  {
    questName: "30 Day Yoga Challenge",
    questDescription: "Complete 30 days of yoga.",
    questImage: "https://i.imgur.com/d51O2fG.png",
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
    questImage: "https://i.imgur.com/fp19wds.png",
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
    questImage: "https://i.imgur.com/UXezxeF.png",
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
  const [isMobile] = useMediaQuery("(max-width: 767px)");

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
        User Panel | Your Quests
      </Heading>

      {sampleQuests.map((q) => {
        const backgroundImageStyle = q.questImage
          ? {
              backgroundImage: `url(${q.questImage})`,
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
              {q.questStatus.toUpperCase()}
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
                    {q.questName}
                  </Heading>
                </HStack>
                <Text
                  color="black"
                  fontSize="xl"
                  position="absolute"
                  right="-4.4%"
                  top="45%"
                  transform={"rotate(90deg)"}
                >
                  {q.questType.toUpperCase()}
                </Text>
              </>
            ) : (
              <HStack>
                <Heading color="black" size="lg">
                  {q.questName}
                </Heading>
                <Text color="black" fontSize="xl">
                  {q.questType.toUpperCase()}
                </Text>
              </HStack>
            )}

            <Text color="black" fontSize="sm" flexWrap w="95%">
              {q.questDescription}
              <br />
              Created by {q.questOwner}
              <br />
              {q.questMembers.length} members | {q.questTasks.length} tasks
            </Text>
          </VStack>
        );

        return (
          <Box
            key={q.questName}
            bgColor={q.questColor}
            py="5%"
            px="5%"
            width="100%"
            textColor="black"
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="lg"
            my="1%"
            position="relative"
          >
            <>
              {questDetails}
              {questStatus}
            </>
          </Box>
        );
      })}
    </Box>
  );
};

export default UserPanel;
