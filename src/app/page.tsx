"use client";

import ApproveAllowance from "@/components/tokenTransactions/ApproveAllowance";
import BurnTokens from "@/components/tokenAdminActions/BurnTokens";
import CheckAllowance from "@/components/tokenInfo/CheckAllowance";
import MintTokens from "@/components/tokenAdminActions/MintTokens";
import TransferFromTokens from "@/components/tokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/tokenTransactions/TransferTokens";
import { useAccount } from "wagmi";
import { Box, Flex, Heading, Highlight, Stack, Text } from "@chakra-ui/react";
import TokenAdminActions from "@/components/tokenAdminActions/TokenAdminActions";
import CheckBalance from "@/components/tokenInfo/CheckBalance";
import TokenInformation from "@/components/tokenInfo/TokenInformation";

export default function Home() {

  const { isConnected } = useAccount();

  return (
    <Box height="100%" minHeight="100dvh" p={6} bg="gray.50">
      <Stack
        align="center"
        justify="center"
        gap={8}
        textAlign="center"
        mt={12}
        px={6}
      >
        <h1 className="w-[35rem] text-6xl text-black h-fit font-bold">
          <Highlight query="with Ease." styles={{ color: "teal.700" }}>
            Transfer Tokens Securely with Ease.
          </Highlight>
        </h1>
        <Text fontSize="md" color="gray.600" maxW="lg">
          Experience a seamless, fast, and secure way to manage your digital assets with our innovative token platform.
        </Text>
      </Stack>

      {isConnected && (
        <>
          {/* Token Info Section */}

          <Box mt={12} px={6} py={8} bg="white" borderRadius="lg" boxShadow="md">
            <h1 className="w-full text-center text-3xl text-black h-fit font-bold mb-2">
              <Highlight query="Contract." styles={{ color: "teal.700" }}>
                Interact with Contract.
              </Highlight>
            </h1>
            <Text fontSize="sm" color="gray.500" mb={6} textAlign="center">
              Interact with the contract to check token balances, allowances, and more.
            </Text>
            <Flex
              wrap="wrap"
              justify="center"
              align="start"
              p={4}
              bg="gray.50"
              borderRadius="lg"
            >
              <TokenInformation />
              <CheckAllowance />
              <CheckBalance />
            </Flex>
          </Box>

          {/* Token Transactions Section */}
          <Box mt={12}>
            <Heading fontSize="2xl" color="teal.600" mb={2}>
              Token Transactions
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={4}>
              Perform secure transfers and manage allowances.
            </Text>
            <Flex wrap="wrap" gap={6}>
              <TransferTokens />
              <TransferFromTokens />
              <ApproveAllowance />
            </Flex>
          </Box>

          {/* Admin Operations Section */}
          <Box mt={12}>
            <Heading fontSize="2xl" color="teal.600" mb={2}>
              Admin Operations
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={4}>
              Manage token supply and perform admin-only actions.
            </Text>
            <Flex wrap="wrap" gap={6}>
              <MintTokens />
              <BurnTokens />
              <TokenAdminActions />
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );

}