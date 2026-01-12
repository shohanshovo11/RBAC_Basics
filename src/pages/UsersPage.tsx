/**
 * UsersPage - Role-based UI demo
 * Modernized with Chakra UI
 */

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth.types";
import { RoleGate } from "../components/auth/RoleGate";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UsersPage: React.FC = () => {
  const { user, logout } = useAuth();

  const [users] = useState<UserData[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "USER" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "ADMIN" },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "USER" },
  ]);

  const cardBg = useColorModeValue("rgba(255,255,255,0.06)", "gray.800");
  const border = "1px solid rgba(255,255,255,0.08)";

  const handleCreateUser = () =>
    alert("Create User clicked - would open create modal");
  const handleDeleteUser = (userId: string) =>
    alert(`Delete User ${userId} clicked - would trigger delete action`);
  const handleEditUser = (userId: string) =>
    alert(`Edit User ${userId} clicked - would open edit modal`);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, rgba(15,23,42,0.96), rgba(11,16,33,0.98))"
      pb={12}
    >
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        backdropFilter="blur(12px)"
        bg="rgba(11,16,33,0.8)"
        borderBottom="1px solid rgba(255,255,255,0.06)"
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: 4, md: 6, lg: 8 }}
          h={16}
          align="center"
          justify="space-between"
        >
          <HStack spacing={4} align="center">
            <Heading
              size="md"
              bgGradient="linear(to-r, brand.400, purple.300)"
              bgClip="text"
            >
              User Management
            </Heading>
            <HStack
              display={{ base: "none", md: "flex" }}
              spacing={2}
              bg="rgba(255,255,255,0.04)"
              p={1}
              rounded="full"
              border="1px solid rgba(255,255,255,0.06)"
            >
              <Button
                as={Link}
                to="/dashboard"
                size="sm"
                variant="ghost"
                colorScheme="whiteAlpha"
              >
                Dashboard
              </Button>
              <Button
                as={Link}
                to="/users"
                size="sm"
                colorScheme="brand"
                variant="solid"
              >
                Users
              </Button>
            </HStack>
          </HStack>

          <HStack spacing={3}>
            <Box textAlign="right" display={{ base: "none", lg: "block" }}>
              <Text fontWeight="semibold" color="gray.100" noOfLines={1}>
                {user?.email}
              </Text>
              <Text fontSize="xs" color="gray.400" noOfLines={1}>
                {user?.roles.join(", ")}
              </Text>
            </Box>
            <Avatar
              size="sm"
              name={user?.email}
              bg="brand.500"
              color="white"
              boxShadow="lg"
            />
            <IconButton
              aria-label="Logout"
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={logout}
              icon={<ArrowForwardIcon />}
            />
          </HStack>
        </Flex>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6, lg: 8 }} pt={8}>
        <Stack spacing={8}>
          <Card
            bg={cardBg}
            border={border}
            boxShadow="2xl"
            backdropFilter="blur(12px)"
          >
            <CardHeader>
              <Heading size="lg" color="white">
                User Management
              </Heading>
              <Text color="gray.300" mt={2}>
                Manage and organize your team members.
              </Text>
            </CardHeader>
            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                gap={4}
              >
                <HStack spacing={4}>
                  <Box
                    w={12}
                    h={12}
                    rounded="lg"
                    display="grid"
                    placeItems="center"
                    bg="brand.900"
                    color="brand.100"
                  >
                    <Text fontWeight="bold">{users.length}</Text>
                  </Box>
                  <Box>
                    <Text color="gray.400" fontSize="sm">
                      Total Users
                    </Text>
                    <Heading size="md" color="white">
                      {users.length}
                    </Heading>
                  </Box>
                </HStack>

                <RoleGate roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                    onClick={handleCreateUser}
                  >
                    Create User
                  </Button>
                </RoleGate>
              </Flex>
            </CardBody>
          </Card>

          <Card bg={cardBg} border={border} backdropFilter="blur(8px)">
            <CardBody>
              <Table variant="simple" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th color="gray.300">Name</Th>
                    <Th
                      color="gray.300"
                      display={{ base: "none", md: "table-cell" }}
                    >
                      Email
                    </Th>
                    <Th color="gray.300">Role</Th>
                    <Th color="gray.300" textAlign="right">
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((userData) => (
                    <Tr
                      key={userData.id}
                      _hover={{ bg: "rgba(255,255,255,0.03)" }}
                    >
                      <Td>
                        <HStack spacing={3}>
                          <Avatar
                            size="sm"
                            name={userData.name}
                            bg="brand.600"
                            color="white"
                          />
                          <Box>
                            <Text color="white" fontWeight="semibold">
                              {userData.name}
                            </Text>
                            <Text
                              color="gray.400"
                              fontSize="sm"
                              display={{ md: "none" }}
                            >
                              {userData.email}
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                      <Td display={{ base: "none", md: "table-cell" }}>
                        <Text color="gray.300">{userData.email}</Text>
                      </Td>
                      <Td>
                        <Tag
                          colorScheme={
                            userData.role === "ADMIN" ? "purple" : "green"
                          }
                          variant="subtle"
                        >
                          {userData.role}
                        </Tag>
                      </Td>
                      <Td textAlign="right">
                        <HStack spacing={2} justify="flex-end">
                          <RoleGate roles={[Role.ADMIN, Role.SUPER_ADMIN]}>
                            <IconButton
                              aria-label="Edit user"
                              size="sm"
                              icon={<EditIcon />}
                              colorScheme="brand"
                              variant="outline"
                              onClick={() => handleEditUser(userData.id)}
                            />
                          </RoleGate>
                          <RoleGate role={Role.SUPER_ADMIN}>
                            <IconButton
                              aria-label="Delete user"
                              size="sm"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              variant="outline"
                              onClick={() => handleDeleteUser(userData.id)}
                            />
                          </RoleGate>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
            <CardHeader>
              <Heading size="sm" color="white">
                Active Roles (debug)
              </Heading>
            </CardHeader>
            <CardBody>
              <HStack spacing={3} wrap="wrap">
                {user?.roles.map((role) => (
                  <Tag
                    key={role}
                    colorScheme="brand"
                    variant="solid"
                    px={4}
                    py={2}
                  >
                    {role}
                  </Tag>
                ))}
              </HStack>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
