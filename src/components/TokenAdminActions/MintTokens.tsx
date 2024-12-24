"use client";
import { useState } from "react";
import { Box, Input, Text, Spinner, Heading, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt } from "wagmi";
import { useTokenOperations } from "@/hooks/useTokenOperations";

const MintTokens = () => {
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [result, setResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { isPending } = useWaitForTransactionReceipt();

    const { mint } = useTokenOperations();

    const mintTokens = async () => {
        if (toAddress.trim() === "" || !amount) {
            toaster.create({
                title: "Error",
                description: "To address and amount are required.",
                type: "info",
                duration: 3000,
            });
            return;
        }

        setLoading(true);

        try {
            await mint(toAddress, amount);
            setResult(true);
            toaster.create({
                title: "Success",
                description: `Successfully minted ${amount} tokens to ${toAddress}.`,
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            console.error("Error minting tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to mint tokens. Please try again.",
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
                Mint Tokens
            </Heading>
            <Flex direction="column" gap={4}>
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
                    type="text"
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
                    onClick={mintTokens}
                    // loading={isPending}
                    loadingText="Minting"
                    mt={4}
                    _hover={{ bg: 'blue.500' }}
                    _active={{ bg: 'blue.700' }}
                >
                    Mint Tokens
                </Button>
                {isPending && <Spinner size="sm" mt={3} color="blue.500" />}
                {result && !isPending && (
                    <Text color="green.500" mt={4}>
                        Successfully minted tokens.
                    </Text>
                )}
            </Flex>
        </Box>
    );

};

export default MintTokens;
