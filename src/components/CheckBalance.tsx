import { useEffect, useState } from 'react';
import { Box, Text, Spinner, Heading, Flex, Input } from '@chakra-ui/react';
import { CONTRACT_ADDRESS, TOKEN_ABI } from '../constants';
import client from '@/lib/viemClient';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import { toaster } from './ui/toaster';
import { getBalance } from "@/services/tokenServices";

const CheckBalance = () => {

    const [account, setAccount] = useState<string>("");
    const [balance, setBalance] = useState<string>('0');
    const [loading, setLoading] = useState<boolean>(true);

    const getCurrentBalance = async () => {
        if (account.trim() === '') {
            toaster.create({
                title: "Error",
                description: "To address and amount are required.",
                type: "info",
                duration: 3000,
            });
            return;
        }
        try {
            const result = await getBalance(account);
            setBalance(result.toString());
            toaster.create({
                title: "Sucess",
                description: "Got the balance successfully.",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "Cannot check balance",
                type: "error",
                duration: 3000,
            });
            console.log(error);
        }
    }

    return (
        <Box
            p={6}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            maxW="md"
            mx="auto"
            mt={6}
        >
            <Heading size="md" mb={4} color="gray.800">
                Check Balance
            </Heading>
            <Flex direction="column" gap={4}>
                <Input
                    color="black"
                    placeholder="Enter address"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    onClick={getCurrentBalance}
                    // loading={isPending}
                    loadingText="Minting"
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Check Balance
                </Button>
                {/* {isPending && <Spinner size="sm" mt={3} color="blue.500" />} */}
                {balance && (
                    <Text color="green.500" mt={4}>
                        {balance}
                    </Text>
                )}
            </Flex>
        </Box>
    );
};

export default CheckBalance;
