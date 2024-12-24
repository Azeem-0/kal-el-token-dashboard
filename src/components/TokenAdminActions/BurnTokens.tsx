"use client";
import { useState } from "react";
import { Box, Input, Text, Spinner, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt } from "wagmi";
import { useTokenOperations } from "@/hooks/useTokenOperations";

const BurnTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [result, setResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { isPending } = useWaitForTransactionReceipt();
    const { burn } = useTokenOperations();

    const burnTokens = async () => {
        if (fromAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Error",
                description: "From address and amount are required.",
                type: "info",
                duration: 3000,
            });
            return;
        }

        setLoading(true);

        try {
            await burn(fromAddress, amount);

            setResult(true);
            toaster.create({
                title: "Success",
                description: `Successfully burned ${amount} tokens from ${fromAddress}.`,
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error burning tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to burn tokens. Please try again.",
                type: "error",
                duration: 3000,
            });
        } finally {
            setLoading(false);
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
                    // loading={isPending}
                    loadingText="Burning"
                    mt={4}
                    _hover={{ bg: 'red.500' }}
                    _active={{ bg: 'red.700' }}
                >
                    Burn Tokens
                </Button>
                {isPending && <Spinner size="sm" mt={3} color="red.500" />}
                {result && !isPending && (
                    <Text color="red.500" mt={4}>
                        Successfully burned tokens.
                    </Text>
                )}
            </Flex>
        </Box>
    );

};

export default BurnTokens;
