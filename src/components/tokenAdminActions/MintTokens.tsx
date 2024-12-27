"use client";
import { useEffect, useState } from "react";
import { Box, Input, Heading, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const MintTokens = () => {
    const [toAddress, setToAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { data: hash, isPending, writeContract, isError, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isError) {
            toaster.create({
                title: "Error",
                description: `${error?.cause}`,
                type: "error",
                duration: 2000,
            });
        }
        if (isConfirmed) {
            toaster.create({
                title: "Success",
                description: `Successfully minted tokens.`,
                type: "success",
                duration: 3000,
            });

            setAmount("");
            setToAddress("");
        }
    }, [isConfirmed, isError]);

    const loading = isPending || isConfirming;

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

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "mint",
                args: [toAddress, parseUnits(amount, DECIMALS)],
            });

        } catch (error) {
            console.error("Error minting tokens:", error);
            toaster.create({
                title: "Error",
                description: "Failed to mint tokens. Please try again.",
                type: "error",
                duration: 3000,
            });
        }
    };

    return (
        <Box
            p={8}
            borderWidth={2}
            borderRadius="lg"
            boxShadow="sm"
            bg="gray.50"
            maxW="md"
            mx="auto"
            mt={8}
        >
            <Heading
                fontSize="xl"
                mb={4}
                color="black"
                fontWeight="semibold"
                textAlign="center"
            >
                Mint Tokens
            </Heading>
            <Stack gap={4}>
                <Input
                    color="black"
                    placeholder="Enter to address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                    _hover={{ borderColor: "teal.400" }}
                />
                <Input
                    color="black"
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                    _hover={{ borderColor: "teal.400" }}
                />
                <Button
                    bg="teal.500"
                    colorScheme="teal"
                    onClick={mintTokens}
                    loading={loading}
                    loadingText="Minting..."
                    mt={4}
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Mint Tokens
                </Button>
            </Stack>
        </Box>
    );

};

export default MintTokens;