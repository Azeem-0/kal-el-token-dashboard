"use client";

import ApproveAllowance from "@/components/TokenTransactions/ApproveAllowance";
import BurnTokens from "@/components/TokenAdminActions/BurnTokens";
import CheckAllowance from "@/components/TokenInfo/CheckAllowance";
import ConnectWallet from "@/components/TokenInfo/ConnectWallet";
import MintTokens from "@/components/TokenAdminActions/MintTokens";
import TransferFromTokens from "@/components/TokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/TokenTransactions/TransferTokens";
import { useAccount } from "wagmi";
import { Box, Stack, Heading, Text, Flex } from "@chakra-ui/react";
import CheckBalance from "@/components/TokenInfo/CheckBalance";
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

            {/* should fetch the owner address from contract itself. */}

            {address === process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS && <TokenAdminActions />}
          </Flex>
        </Stack>
      )}
    </Box>
  );

}
