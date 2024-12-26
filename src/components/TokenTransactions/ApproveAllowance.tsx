
import { useEffect, useState } from "react";
import { Box, Input, Heading, Flex, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, DECIMALS, TOKEN_ABI } from "@/constants";
import { parseUnits } from "viem";


const ApproveAllowance = () => {
    const [spender, setSpender] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const { data: hash, isPending, writeContractAsync } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isSuccess) {
            toaster.create({
                title: "Success",
                description: "Allowance approved",
                type: "success",
                duration: 2000,
            });
            setSpender("");
            setAmount("");
        }
    }, [isSuccess]);

    const loading = isPending || isConfirming;

    const approve = async () => {
        if (spender.trim() === "" || !amount) {
            toaster.create({
                title: "Warning",
                description: "Both spender address and amount are required.",
                type: "info",
                duration: 2000,
            });
            return;
        }

        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: TOKEN_ABI,
                functionName: "approve",
                args: [spender, parseUnits(amount, DECIMALS)],
            });
        } catch (error) {
            console.error("Error approving allowance:", error);
            toaster.create({
                title: "Error",
                description: "Failed to approve allowance. Please try again.",
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
                Approve Allowance
            </Heading>
            <Stack gap={4}>
                <Input
                    color="black"
                    placeholder="Enter spender address"
                    value={spender}
                    onChange={(e) => setSpender(e.target.value)}
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
                    onClick={approve}
                    loading={loading}
                    loadingText="Approving..."
                    mt={4}
                    _hover={{ bg: "teal.400" }}
                    _active={{ bg: "teal.600" }}
                >
                    Approve Allowance
                </Button>
            </Stack>
        </Box>
    );

};

export default ApproveAllowance;
