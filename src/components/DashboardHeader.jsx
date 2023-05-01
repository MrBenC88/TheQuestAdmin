import React from "react";
import {
  Container,
  Heading,
  VStack,
  Button,
  HStack,
  Spacer,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Text,
  Avatar,
  Box,
  Image,
  Link,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useState } from "react";

const DashboardHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentMode, setCurrentMode } = useState("challenger"); // challenger or admin mode

  // Proposed Modules for ADMIN MODE:
  // Account Management: A module that allows creators/administrators to manage their account. They should be able to change their password, update their profile, and view their billing information.
  // - Change Password
  // - Update Profile
  // - View Billing Information
  // - View Subscription Information
  // - View Payment History

  // Quest Management: A module that allows creators/administrators to create, edit, and delete quests. They should be able to set quest goals, rules, and rewards.
  // - Create, Edit, Delete Quests
  // - Quest Branding
  // - Quest Settings (Goals, Rules, Rewards) and Quest specific settings like type, duration, etc.
  // - Quest Progress (Users, Progress, Rewards)
  // - Quest Bundles (Grouping of Quests)
  // - Manage Quest Invites / Access

  // User Management: A module that enables creators/administrators to manage users who have access to the quests. They should be able to add, remove, and edit users, as well as track their progress.
  // - Add, Remove, Edit Users
  // - User Progress

  // Analytics: A module that provides creators/administrators with data and insights about user engagement and progress. They should be able to see statistics such as the number of quests completed, the number of users engaged, and the overall engagement rate.
  // - Data and Insights about User Engagement and Progress
  // - Statistics such as the number of quests completed, the number of users engaged, and the overall engagement rate

  // Notifications: A module that sends automated notifications to users when they reach certain milestones or complete quests. Creators/administrators should be able to customize the notifications and select the triggers.
  // Settings: A module that allows creators/administrators to configure the platform's settings, such as the theme, language, and access control.
  // Support: A module that provides creators/administrators with a way to contact the platform's support team if they have any issues or questions.

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Modules for User Mode / Challenger mode:
  // My Quests: A module that allows users to view their quests and track their current quests included completed, in progress, and upcoming quests.
  // This module also enables users to do the actual submission. It will be a list of quest cards that contain the related quest's actual list of tasks.
  // Browse Quests: A module that allows users to browse quests that are available to them. They should be able to see the quest details and join the quest. They can join all public quests or private quests
  // that they have been invited to via invitation code. They also can choose to create a quest here.
  // Marketplace: A module that allows users to purchase quests from the marketplace. They should be able to see the quest details and purchase the quest. They can also use this module to use their points
  // to purchase new quests or quest specific rewards. There are two types of currencies. Quest specific coins and global coins.
  // Quest specific coins can only be used to purchase quests and quest specific rewards. Global coins can be used to purchase anything on the platform.
  // Settings: A module that allows users to configure the platform's settings, such as the theme, language, and access control.
  // Support: A module that provides users with a way to contact the platform's support team if they have any issues or questions.

  const menuItems = [
    { tabName: "My Quests", url: "/dashboard", icon: HamburgerIcon },
    {
      tabName: "Browse Quests",
      url: "/browse",
      icon: HamburgerIcon,
    },
    // { tabName: "User Management", url: "/users", icon: HamburgerIcon },
    // { tabName: "Analytics", url: "/analytics", icon: HamburgerIcon },
    // { tabName: "Notifications", url: "/notifications", icon: HamburgerIcon },
    { tabName: "Marketplace", url: "/market", icon: HamburgerIcon },
    { tabName: "Inventory", url: "/inventory", icon: HamburgerIcon },
    { tabName: "Settings", url: "/settings", icon: HamburgerIcon },
    { tabName: "Support", url: "/support", icon: HamburgerIcon },
    {
      tabName: "Toggle Admin Mode",
      url: "/admin",
      icon: HamburgerIcon,
    },
  ];

  return (
    <Box bg="white" w="100%" py="1%" px="1%" overflow="hidden">
      <HStack justifyContent="space-between">
        <HStack>
          <Button colorScheme="blackAlpha" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Flex alignItems="left" p="10px">
            <Heading as="h1" size={"md"} color="black">
              Life Admin | Welcome Challenger
            </Heading>
          </Flex>
        </HStack>

        <a href="/dashboard">
          <Button colorScheme="linkedin" mt={2} size={"md"}>
            Logout
          </Button>
        </a>
      </HStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" bgColor="white">
            <HStack>
              <Avatar name="AdminUser" size="lg" src={"adminuser"} />
              <Box>
                <Text textColor="black">NormalUser</Text>
                {/* <Link to={`/profile/${user.googleId}`}> */}
                <Link to={`/`}>
                  <Text fontSize="md" textColor="black">
                    View Profile
                  </Text>
                </Link>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody bgColor="white">
            <Box w="100%" p="1px">
              {menuItems.map((entry, index) => {
                return (
                  <a href={entry.url} key={index}>
                    <Button
                      key={index}
                      variant="ghost"
                      p="0px 0px"
                      my="5px"
                      w="100%"
                      h="50px"
                      justifyContent="flex-start"
                    >
                      <HStack p="10px">
                        {/* <Icon as={entry.icon} w={6} h={6} mr="5px" /> */}
                        <Text fontSize="20px" textColor="black">
                          {entry.tabName}
                        </Text>
                      </HStack>
                    </Button>
                  </a>
                );
              })}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DashboardHeader;
