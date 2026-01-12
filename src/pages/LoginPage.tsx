/**
 * LoginPage - Authentication Entry Point
 * Modernized with Chakra UI
 */

import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MOCK_TOKENS = {
  user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiZXhwIjo5OTk5OTk5OTk5fQ.USER_TOKEN_SIGNATURE",
  admin:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbi00NTYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjo5OTk5OTk5OTk5fQ.ADMIN_TOKEN_SIGNATURE",
  superAdmin:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlci03ODkiLCJlbWFpbCI6InN1cGVyQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iXSwiZXhwIjo5OTk5OTk5OTk5fQ.SUPERADMIN_TOKEN_SIGNATURE",
};

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = (userType: keyof typeof MOCK_TOKENS) => {
    try {
      const token = MOCK_TOKENS[userType];
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="radial(at 20% 20%, rgba(99,102,241,0.16), transparent 40%), radial(at 80% 0%, rgba(236,72,153,0.18), transparent 35%), linear(to-br, #0f172a, #0b1021)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={10}
    >
      <Container maxW="4xl">
        <Card bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,255,255,0.08)" boxShadow="2xl" backdropFilter="blur(12px)">
          <CardHeader textAlign="center" pb={0}>
            <Icon as={LockIcon} boxSize={12} color="brand.300" mb={3} />
            <Heading size="lg" color="white" mb={1}>
              RBAC Demo
            </Heading>
            <Text color="gray.300">Role-based access control showcase</Text>
          </CardHeader>
          <CardBody>
            {error && (
              <Alert status="error" variant="left-accent" mb={4} rounded="lg">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Card bg="rgba(255,255,255,0.03)" border="1px solid rgba(255,255,255,0.06)">
                <CardBody>
                  <Stack spacing={3}>
                    <Heading size="md" color="white">
                      User
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      Basic access for viewing dashboards only.
                    </Text>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Badge colorScheme="gray">Role: USER</Badge>
                      <Badge colorScheme="blue">View Dashboard</Badge>
                    </Stack>
                    <Button
                      onClick={() => handleLogin("user")}
                      colorScheme="whiteAlpha"
                      variant="outline"
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Login as User
                    </Button>
                  </Stack>
                </CardBody>
              </Card>

              <Card bg="rgba(99,102,241,0.08)" border="1px solid rgba(99,102,241,0.25)">
                <CardBody>
                  <Stack spacing={3}>
                    <Heading size="md" color="white">
                      Admin
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                      Manage users and access analytics/export.
                    </Text>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Badge colorScheme="purple">Role: ADMIN</Badge>
                      <Badge colorScheme="green">Create/Edit Users</Badge>
                      <Badge colorScheme="blue">Analytics</Badge>
                    </Stack>
                    <Button
                      onClick={() => handleLogin("admin")}
                      colorScheme="brand"
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Login as Admin
                    </Button>
                  </Stack>
                </CardBody>
              </Card>

              <Card bg="rgba(147,51,234,0.1)" border="1px solid rgba(147,51,234,0.25)">
                <CardBody>
                  <Stack spacing={3}>
                    <Heading size="md" color="white">
                      Super Admin
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                      Full system access including settings and delete.
                    </Text>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Badge colorScheme="purple">Role: SUPER_ADMIN</Badge>
                      <Badge colorScheme="red">Delete Users</Badge>
                      <Badge colorScheme="orange">System Settings</Badge>
                    </Stack>
                    <Button
                      onClick={() => handleLogin("superAdmin")}
                      colorScheme="purple"
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Login as Super Admin
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>

            <Divider my={6} borderColor="rgba(255,255,255,0.08)" />
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align="flex-start">
              <Badge colorScheme="yellow">Demo Note</Badge>
              <Text color="gray.300" fontSize="sm" lineHeight="tall">
                These are mock JWT tokens for demonstration. In production, tokens must be issued by
                your backend after verifying credentials and MFA requirements.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};
