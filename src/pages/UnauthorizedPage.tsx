/**
 * UnauthorizedPage - 403 view with CTA
 * Modernized with Chakra UI
 */

import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { WarningTwoIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UnauthorizedPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, rgba(15,23,42,0.96), rgba(11,16,33,0.98))"
      px={6}
    >
      <Card
        maxW="560px"
        w="full"
        p={2}
        bg="rgba(255,255,255,0.04)"
        border="1px solid rgba(255,255,255,0.06)"
        boxShadow="2xl"
        backdropFilter="blur(12px)"
      >
        <CardBody>
          <Stack spacing={5} align="center" textAlign="center">
            <Box
              w={16}
              h={16}
              rounded="full"
              bg="rgba(255, 99, 71, 0.12)"
              display="grid"
              placeItems="center"
              border="1px solid rgba(255, 99, 71, 0.24)"
            >
              <Icon as={WarningTwoIcon} color="tomato" boxSize={8} />
            </Box>

            <Stack spacing={2}>
              <Heading size="lg" color="white">
                Access Denied
              </Heading>
              <Text color="gray.300">
                You don't have permission to view this page. Please switch accounts or go back to a permitted area.
              </Text>
            </Stack>

            <Stack direction={{ base: "column", sm: "row" }} spacing={3} w="full" justify="center">
              <Button
                as={Link}
                to="/dashboard"
                leftIcon={<ArrowBackIcon />}
                variant="outline"
                colorScheme="whiteAlpha"
                w={{ base: "full", sm: "auto" }}
              >
                Go to Dashboard
              </Button>
              <Button
                colorScheme="brand"
                variant="solid"
                w={{ base: "full", sm: "auto" }}
                onClick={logout}
              >
                Switch Account
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};
