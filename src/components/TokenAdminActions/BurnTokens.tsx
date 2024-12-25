"use client";
import { useState } from "react";
import { Box, Input, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const BurnTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { isPending, writeContractAsync } = useWriteContract();

    const burnTokens = async () => {
        if (fromAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "From address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "burn",
                args: [fromAddress, parseUnits(amount, DECIMALS)],
            });

            toaster.create({
                title: "Success",
                description: "Successfully burned tokens",
                type: "success",
                duration: 2000,
            });
            setFromAddress("");
            setAmount("");
        } catch (error) {
            console.error("Error burning tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to burn tokens. Please try again.",
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
                Burn Tokens
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
                    bg="red.600"
                    colorScheme="red"
                    onClick={burnTokens}
                    loading={isPending}
                    loadingText="Burning"
                    mt={4}
                    _hover={{ bg: 'red.500' }}
                    _active={{ bg: 'red.700' }}
                >
                    Burn Tokens
                </Button>
            </Flex>
        </Box>
    );

};

export default BurnTokens;
