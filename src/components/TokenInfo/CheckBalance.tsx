import { useState } from 'react';
import { Box, Text, Spinner, Heading, Flex, Input } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { toaster } from '../ui/toaster';
import { useTokenOperations } from '@/hooks/useTokenOperations';


const CheckBalance = () => {

    const [account, setAccount] = useState<string>("");
    const [balance, setBalance] = useState<string>('0');

    const [loading, setLoading] = useState<boolean>(false);

    const { checkBalance } = useTokenOperations();

    const getCurrentBalance = async () => {
        if (account.trim() === '') {
            toaster.create({
                title: "Warning",
                description: "Wallet address is required.",
                type: "info",
                duration: 3000,
            });
            return;
        }
        setLoading(true);
        try {
            const result = await checkBalance(account);
            setBalance(result.toString());
            toaster.create({
                title: "Success",
                description: "Checked Balance successfully.",
                type: "success",
            });
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "Cannot check balance",
                type: "error",
                duration: 3000,
            });
            console.log(error);
        } finally {
            setLoading(false);
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
                    loading={loading}
                    loadingText="Loading..."
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Check Balance
                </Button>
                {balance && (
                    <Text fontWeight="semibold" mt={4} color="gray.700">
                        Balance : {balance} KET
                    </Text>
                )}
            </Flex>
        </Box>
    );
};

export default CheckBalance;
