import {
  Box,
  HStack,
  Button,
  Image,
  Heading,
  Link,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as URL_CONSTANTS from "../constants/constants.js";

const menuItems = [
  {
    linkName: "Products",
    linkPath: "/",
  },
  {
    linkName: "Pricing",
    linkPath: "/",
  },
  {
    linkName: "Community",
    linkPath: "/community",
  },
  {
    linkName: "Company",
    linkPath: "/company",
  },
  {
    linkName: "Log in",
    linkPath: "/login",
  },
  // {
  //   linkName: "Resources",
  //   linkPath: URL_CONSTANTS.TCC_NOTION_URL,
  // },

  // {
  //   linkName: "Blog",
  //   linkPath: URL_CONSTANTS.TCC_MEDIUM_URL,
  // },
  // {
  //   linkName: "Discord",
  //   linkPath: URL_CONSTANTS.DISCORD_URL,
  // },
];
const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      bgColor="white"
      py="1%"
      px="5%"
      justifyContent="space-between"
      w="100%"
      wrap="wrap"
    >
      <Link href="/">
        <HStack pt="2%">
          <Image
            src="https://i.imgur.com/IRXSGCY.png"
            alt="techchangelogo"
            boxSize="15%"
            ml={isMobile ? "10%" : "0%"}
            maxW="100%"
          />
          <Heading as="h1" size={isMobile ? "lg" : "md"} textColor="black">
            Life ADMIN
          </Heading>
        </HStack>
      </Link>
      <Flex
        direction={isMobile ? "column" : "row"}
        wrap="wrap"
        justifyContent={isMobile ? "space-evenly" : "flex-end"}
      >
        {menuItems.map((item) => {
          return (
            <Link
              href={item.linkPath}
              key={item.linkName}
              py={isMobile ? 1 : 4}
              px={5}
            >
              <Box>
                <Heading
                  as="h1"
                  size={isMobile ? "lg" : "sm"}
                  textColor="black"
                >
                  {item.linkName}
                </Heading>
              </Box>{" "}
            </Link>
          );
        })}
        <a href={URL_CONSTANTS.DISCORD_URL}>
          <Button
            colorScheme="linkedin"
            mt={isMobile ? 4 : 2}
            size={isMobile ? "lg" : "md"}
          >
            Get Started
          </Button>
        </a>
      </Flex>
    </Flex>
  );
};

export default Header;
