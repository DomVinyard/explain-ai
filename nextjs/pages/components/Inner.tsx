import { Box } from "@chakra-ui/react";

export default function Inner({ children }: any) {
  return (
    <Box maxW={900} mx="auto">
      {children}
    </Box>
  );
}
