"use client";

import ApproveAllowance from "@/components/tokenTransactions/ApproveAllowance";
import BurnTokens from "@/components/tokenAdminActions/BurnTokens";
import CheckAllowance from "@/components/tokenInfo/CheckAllowance";
import ConnectWallet from "@/components/tokenInfo/ConnectWallet";
import MintTokens from "@/components/tokenAdminActions/MintTokens";
import TransferFromTokens from "@/components/tokenTransactions/TransferFromTokens";
import TransferTokens from "@/components/tokenTransactions/TransferTokens";
import { useAccount } from "wagmi";
import { Box, Stack, Heading, Text, Flex } from "@chakra-ui/react";
import CheckBalance from "@/components/tokenInfo/CheckBalance";
import TokenAdminActions from "@/components/tokenAdminActions/TokenAdminActions";

export default function Home() {
  const { isConnected, address } = useAccount();
  return (
    <Box height="100%" minHeight="100dvh" p={6} bg="gray.50">
    </Box>
  );

}


{/* {isConnected && (
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

            
          </Flex>
        </Stack>
      )} */}

{/* should fetch the owner address from contract itself. */ }

{/* {address === process.env.NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS && <TokenAdminActions />} */ }