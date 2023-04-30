import React from "react";

import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  chakra,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

// Search Bar Component
export default chakra(function SearchBar({ handleChange }) {
  return (
    <InputGroup size="md">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="black" />}
      />
      <Input
        placeholder={"Search quests..."}
        size="md"
        variant="outline"
        onChange={(e) => handleChange(e.target.value)}
        boxShadow="0 0 0 2px #CBD5E0"
        _focus={{
          boxShadow: "0 0 0 2px #CBD5E0",
        }}
        _placeholder={{ opacity: 1, color: "black" }}
      />
    </InputGroup>
  );
});
