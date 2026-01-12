/**
 * DashboardPage - Multi-Level Role Demonstration
 * Modernized with Chakra UI
 */

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Switch,
  Tag,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  DownloadIcon,
  LockIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CalendarIcon,
  TimeIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { RoleGate } from "../components/auth/RoleGate";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth.types";

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [exportFormat, setExportFormat] = useState<string>("csv");

  const cardBg = useColorModeValue("rgba(255,255,255,0.06)", "gray.800");
  const border = "1px solid rgba(255,255,255,0.08)";

  const stats = useMemo(
    () => [
      {
        label: "Total Users",
        value: "1,247",
        trend: "+4.2% MoM",
        accent: "blue",
        icon: ArrowUpIcon,
      },
      {
        label: "Active Users",
        value: "856",
        trend: "+2.1% WoW",
        accent: "green",
        icon: CheckCircleIcon,
      },
      {
        label: "New This Week",
        value: "42",
        trend: "+12 new",
        accent: "purple",
        icon: CalendarIcon,
      },
      {
        label: "MRR",
        value: "$24,680",
        trend: "+$1.2k",
        accent: "orange",
        icon: TimeIcon,
      },
    ],
    []
  );

  const analyticsData = useMemo(
    () => [
      {
        label: "User Growth",
        value: "+12.5%",
        helper: "vs last month",
        accent: "blue",
      },
      {
        label: "Engagement",
        value: "68%",
        helper: "active sessions",
        accent: "green",
      },
      {
        label: "Churn",
        value: "2.3%",
        helper: "monthly avg",
        accent: "orange",
      },
      {
        label: "Avg Session",
        value: "8m 32s",
        helper: "per user",
        accent: "purple",
      },
    ],
    []
  );

  const handleExport = (format: string) => {
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  const handleSettingsSave = () => {
    alert("Settings saved successfully!");
  };

  const lockFallback = (title: string) => (
    <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
      <CardBody textAlign="center" py={10}>
        <Icon as={LockIcon} boxSize={10} color="yellow.300" mb={4} />
        <Heading size="md" color="white" mb={2}>
          {title}
        </Heading>
        <Text color="gray.300" maxW="420px" mx="auto">
          Your current role does not grant access. Contact an administrator to
          request elevation.
        </Text>
        <HStack justify="center" mt={4} spacing={2}>
          {user?.roles.map((role) => (
            <Tag key={role} colorScheme="yellow" variant="subtle">
              {role}
            </Tag>
          ))}
        </HStack>
      </CardBody>
    </Card>
  );

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
              Command Center
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
                colorScheme="brand"
                variant="solid"
              >
                Dashboard
              </Button>
              <Button
                as={Link}
                to="/users"
                size="sm"
                variant="ghost"
                colorScheme="whiteAlpha"
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
        <Stack spacing={10}>
          <Card
            bg={cardBg}
            border={border}
            boxShadow="2xl"
            p={6}
            backdropFilter="blur(12px)"
          >
            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                gap={6}
              >
                <VStack align="flex-start" spacing={2} flex={1}>
                  <Heading size="lg" color="white">
                    Welcome back, {user?.email?.split("@")[0]}
                  </Heading>
                  <Text color="gray.300">
                    Live view of user health, engagement, and access controls.
                  </Text>
                  <HStack spacing={3} flexWrap="wrap">
                    {user?.roles.map((role) => (
                      <Tag key={role} colorScheme="brand" variant="subtle">
                        {role}
                      </Tag>
                    ))}
                  </HStack>
                </VStack>
                <Button
                  as={Link}
                  to="/users"
                  colorScheme="brand"
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Manage Users
                </Button>
              </Flex>
            </CardBody>
          </Card>

          <Stack spacing={6}>
            <Flex align="center" justify="space-between">
              <Heading size="md" color="white">
                Overview
              </Heading>
              <Text fontSize="sm" color="gray.400">
                Available to all roles
              </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
              {stats.map((item) => (
                <Card
                  key={item.label}
                  bg={cardBg}
                  border={border}
                  backdropFilter="blur(10px)"
                >
                  <CardBody>
                    <Flex align="center" justify="space-between" mb={3}>
                      <Box
                        w={10}
                        h={10}
                        rounded="lg"
                        display="grid"
                        placeItems="center"
                        bg={`${item.accent}.900`}
                      >
                        <Icon
                          as={item.icon}
                          boxSize={5}
                          color={`${item.accent}.200`}
                        />
                      </Box>
                      <Badge colorScheme={item.accent} variant="subtle">
                        {item.trend}
                      </Badge>
                    </Flex>
                    <Stat>
                      <StatLabel color="gray.400">{item.label}</StatLabel>
                      <StatNumber color="white" fontSize="2xl">
                        {item.value}
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>

          <RoleGate
            roles={[Role.ADMIN, Role.SUPER_ADMIN]}
            fallback={lockFallback("Advanced analytics locked")}
          >
            <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
              <CardHeader>
                <Flex align="center" justify="space-between">
                  <Heading size="md" color="white">
                    Advanced Analytics
                  </Heading>
                  <Badge colorScheme="brand" variant="solid">
                    Admin + Super Admin
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
                  {analyticsData.map((item) => (
                    <Box
                      key={item.label}
                      p={5}
                      rounded="xl"
                      bgGradient={`linear(to-br, ${item.accent}.500, ${item.accent}.700)`}
                      color="white"
                      boxShadow="xl"
                    >
                      <Text fontSize="sm" opacity={0.85}>
                        {item.helper}
                      </Text>
                      <Heading size="lg" mt={2}>
                        {item.value}
                      </Heading>
                      <Text mt={1} fontWeight="semibold">
                        {item.label}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </RoleGate>

          <RoleGate
            roles={[Role.ADMIN, Role.SUPER_ADMIN]}
            fallback={lockFallback("Data export locked")}
          >
            <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
              <CardHeader>
                <Flex align="center" justify="space-between">
                  <Heading size="md" color="white">
                    Data Export
                  </Heading>
                  <Badge colorScheme="green" variant="subtle">
                    Secure channel
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text color="gray.300" mb={4}>
                  Export dashboard data for downstream analytics and compliance
                  reports.
                </Text>
                <ButtonGroup variant="ghost" spacing={3} mb={4}>
                  {["csv", "json", "pdf"].map((format) => (
                    <Button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      colorScheme={
                        exportFormat === format ? "brand" : "whiteAlpha"
                      }
                      variant={exportFormat === format ? "solid" : "outline"}
                    >
                      {format.toUpperCase()}
                    </Button>
                  ))}
                </ButtonGroup>

                <Button
                  leftIcon={<DownloadIcon />}
                  colorScheme="green"
                  size="lg"
                  onClick={() => handleExport(exportFormat)}
                  width={{ base: "100%", sm: "auto" }}
                >
                  Export as {exportFormat.toUpperCase()}
                </Button>
              </CardBody>
            </Card>
          </RoleGate>

          <RoleGate
            role={Role.SUPER_ADMIN}
            fallback={lockFallback("Settings locked")}
          >
            <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
              <CardHeader>
                <Flex align="center" justify="space-between">
                  <Heading size="md" color="white">
                    System Settings
                  </Heading>
                  <Badge colorScheme="purple" variant="solid">
                    Super Admin only
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack spacing={5}>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel mb={0} color="white">
                        Email Notifications
                      </FormLabel>
                      <Text fontSize="sm" color="gray.400">
                        Send release and incident updates
                      </Text>
                    </Box>
                    <Switch defaultChecked colorScheme="purple" />
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel mb={0} color="white">
                        Two-Factor Authentication
                      </FormLabel>
                      <Text fontSize="sm" color="gray.400">
                        Enforce 2FA for all admins
                      </Text>
                    </Box>
                    <Switch colorScheme="purple" />
                  </FormControl>

                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <FormLabel mb={0} color="white">
                        Maintenance Mode
                      </FormLabel>
                      <Text fontSize="sm" color="gray.400">
                        Pause user logins during deployments
                      </Text>
                    </Box>
                    <Switch colorScheme="purple" />
                  </FormControl>

                  <Divider borderColor="rgba(255,255,255,0.08)" />

                  <Button
                    leftIcon={<SettingsIcon />}
                    colorScheme="purple"
                    size="lg"
                    onClick={handleSettingsSave}
                    alignSelf={{ base: "stretch", sm: "flex-end" }}
                  >
                    Save Settings
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </RoleGate>

          <Card bg={cardBg} border={border} backdropFilter="blur(10px)">
            <CardHeader>
              <Heading size="sm" color="white">
                Active Roles (debug)
              </Heading>
            </CardHeader>
            <CardBody>
              <Wrap spacing={3}>
                {user?.roles.map((role) => (
                  <WrapItem key={role}>
                    <Tag colorScheme="brand" variant="solid" px={4} py={2}>
                      {role}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};
