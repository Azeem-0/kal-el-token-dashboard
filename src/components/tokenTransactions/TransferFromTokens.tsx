
import { useEffect, useState } from "react";
import { Box, Input, Heading, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";

const TransferFromTokens = () => {
    const [fromAddress, setFromAddress] = useState<string>("");
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
                description: "Successfully transfered tokens.",
                type: "success",
                duration: 2000,
            });

            setTimeout(() => {
                setFromAddress("");
                setToAddress("");
                setAmount("");
            }, 1000);
        }


    }, [isConfirmed, isError]);

    const loading = isPending || isConfirming;

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
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "transferFrom",
                args: [fromAddress, toAddress, parseUnits(amount, DECIMALS)],
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
                Transfer From Tokens
            </Heading>
            <Stack gap={4}>
                <Input
                    color="black"
                    placeholder="Enter from address"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    bg="gray.100"
                    borderColor="gray.300"
                    pl="4"
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px #319795" }}
                    _hover={{ borderColor: "teal.400" }}
                />
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
                    textAlign="center"
                    onClick={transferFromTokens}
                    loading={loading}
                    loadingText="Transferring..."
                    mt={4}
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Transfer From Tokens
                </Button>
            </Stack>
        </Box>
    );

};

export default TransferFromTokens;