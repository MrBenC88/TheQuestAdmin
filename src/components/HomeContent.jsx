import {
  Box,
  Text,
  Link,
  Heading,
  VStack,
  HStack,
  Button,
  Container,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";

const HomeContent = () => {
  const resourceGridColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(3, 1fr)",
  });
  const vStackWidth = useBreakpointValue({ base: "100%", md: "50%" });

  return (
    <Box bgColor="lightblue" pt="1%" pb="1%" pr="5%">
      <Text fontSize="2xl" color="black" p="20%">
        HomeContent page coming soon!
      </Text>
    </Box>
  );
};

export default HomeContent;
