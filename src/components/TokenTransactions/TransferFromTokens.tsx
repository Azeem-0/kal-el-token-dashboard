
import { useState } from "react";
import { Box, Input, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const TransferFromTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { isPending, writeContractAsync } = useWriteContract();

    const transferFromTokens = async () => {
        if (fromAddress.trim() === "" || toAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "Please fill all the required fields.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "transferFrom",
                args: [fromAddress, toAddress, parseUnits(amount, DECIMALS)],
            });

            toaster.create({
                title: "Success",
                description: "Successfully transfered tokens.",
                type: "success",
                duration: 2000,
            });
        } catch (error) {
            console.error("Error transferring tokens:", error);

            toaster.create({
                title: "Error",
                description: "Failed to transfer tokens. Please try again.",
                type: "error",
                duration: 2000,
            });
        }
    };

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
                Transfer From Tokens
            </Heading>
            <Flex direction="column" gap={4}>
                <Input
                    color="black"
                    placeholder="Enter from address"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    placeholder="Enter to address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Input
                    color="black"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    _hover={{ borderColor: 'blue.400' }}
                />
                <Button
                    bg="blue.600"
                    colorScheme="blue"
                    textAlign="center"
                    onClick={transferFromTokens}
                    loading={isPending}
                    loadingText="Transferring..."
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Transfer From Tokens
                </Button>
            </Flex>
        </Box>
    );

};

export default TransferFromTokens;
