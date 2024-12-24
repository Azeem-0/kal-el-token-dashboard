"use client";

import ApproveAllowance from "@/components/ApproveAllowance";
import BurnTokens from "@/components/BurnTokens";
import CheckAllowance from "@/components/CheckAllowance";
import ConnectWallet from "@/components/ConnectWallet";
import MintTokens from "@/components/MintTokens";
import TransferFromTokens from "@/components/TransferFromTokens";
import TransferTokens from "@/components/TransferTokens";
import { useAccount } from "wagmi";
import { Box, Stack, Heading, Text, Flex } from "@chakra-ui/react";
import CheckBalance from "@/components/CheckBalance";
import HandleTokenOperations from "@/components/HandleTokenOperations";
import TokenAdminActions from "@/components/TokenAdminActions/TokenAdminActions";

export default function Home() {
  const { isConnected, address } = useAccount();
  return (
    <Box height="100%" minHeight="100dvh" p={6} bg="gray.50">
      <ConnectWallet />
      {isConnected && (
        <Stack gap={6} mt={8} borderSpacing={5}>
          <Heading width="full" textAlign="center" size="lg" color="teal.600">
            Wallet Address: <Text as="span" textAlign="center" color="gray.800">{address}</Text>
          </Heading>

          <Flex wrap="wrap" gap="1.25rem">
            <CheckBalance />
            <CheckAllowance />
            <ApproveAllowance />
            <TransferTokens />
            <TransferFromTokens />
            <MintTokens />
            <BurnTokens />

            {address === process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS && <TokenAdminActions />}
          </Flex>
        </Stack>
      )}
    </Box>
  );

}
