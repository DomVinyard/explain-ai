import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Inner from "./Inner";

const audiences = [
  { url: "5", label: "5" },
  { url: "10", label: "10" },
  { url: "20", label: "Adult" },
];

export default function Header({ slug, audience }: any) {
  return (
    <Box bg="#111">
      <Inner>
        <Flex justifyContent={"space-between"}>
          <Box color="white">Explain</Box>
          <Flex>
            {audiences.map((a) => (
              <Link href={`/${slug}/${a.url}`} key={a.url}>
                <Box
                  color="white"
                  _hover={{ color: "gray.200" }}
                  cursor="pointer"
                  border={a.url === audience ? "1px solid white" : "none"}
                >
                  {a.label}
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Inner>
    </Box>
  );
}
